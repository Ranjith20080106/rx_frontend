'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { ApiService } from '@/utils/api';
import { AuthService } from '@/utils/auth';
import { JOBS_DATA } from '@/utils/jobs-data';

export default function Dashboard() {
    const router = useRouter();

    // UI Toast state
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    // State Variables
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    // Derived values
    const charCount = jobDescription.length;
    const wordCount = jobDescription.trim() === '' ? 0 : jobDescription.trim().split(/\s+/).length;

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Report Output states
    const [report, setReport] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const fileInputRef = useRef(null);

    // AI Resume Improvement states
    const [originalText, setOriginalText] = useState('');
    const [improvedText, setImprovedText] = useState('');
    const [improvedScore, setImprovedScore] = useState(85);
    const [showImprovementView, setShowImprovementView] = useState(false);

    const displayToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3200);
    };

    // Load a report directly
    async function loadHistoricalReportDirectly(id) {
        setIsAnalyzing(true);
        try {
            const history = await ApiService.fetchHistory();
            const reportData = history.find(r => r.id === id);
            if (reportData) {
                setReport(reportData);
                displayToast("Historical report loaded successfully.");
            } else {
                throw new Error("Report details not found in history logs.");
            }
        } catch (e) {
            displayToast(`Error opening report: ${e.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    }

    // Auto-load latest report
    async function loadLatestReportAutomatically() {
        try {
            const history = await ApiService.fetchHistory();
            if (history && history.length > 0) {
                // history is sorted desc (latest first)
                setReport(history[0]);
            }
        } catch (e) {
            console.warn("Failed to auto-load latest report:", e);
        }
    }

    // 1. Monitor Redirects and Auto-Load Session History
    useEffect(() => {
        // Check for success subscription redirect
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('subscription') === 'success') {
            // Clear URL param query
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(() => {
                displayToast("Premium plan activated successfully! Welcome to ResumeX Premium.");
            }, 500);
        }

        // Check deep-links lookup (Redirect checks from History panel)
        const viewReportId = sessionStorage.getItem('view_report_id');
        if (viewReportId) {
            sessionStorage.removeItem('view_report_id'); // clear key
            setTimeout(() => {
                loadHistoricalReportDirectly(viewReportId);
            }, 0);
        } else {
            setTimeout(() => {
                loadLatestReportAutomatically();
            }, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 3. Drag and Drop Actions
    const handleFileChange = (e) => {
        handleFileSelection(e.target.files[0]);
    };

    const handleFileSelection = (file) => {
        if (!file) return;

        const filename = file.name.toLowerCase();
        const extension = filename.split('.').pop();
        const allowedExtensions = ['pdf', 'docx', 'txt'];

        if (!allowedExtensions.includes(extension)) {
            displayToast("Invalid file format. Please upload PDF, DOCX, or TXT documents.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            displayToast("File size exceeds 5MB limit. Please upload a smaller document.");
            return;
        }

        setSelectedFile(file);
        displayToast("Resume selected successfully!");
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        displayToast("Resume removed.");
    };

    // 4. IT Role Dropdown Selection
    const handleRoleChange = (e) => {
        const role = e.target.value;
        setSelectedRole(role);
        if (JOBS_DATA[role]) {
            setJobDescription(JOBS_DATA[role]);
            displayToast(`Job Description for ${role} loaded.`);
        }
    };

    // 5. Submit Resume for Analysis
    const handleSubmitAnalysis = async () => {
        if (!selectedFile) {
            displayToast("Please upload your resume file first!");
            return;
        }

        const jdText = jobDescription.trim();
        if (!jdText) {
            displayToast("Please enter target Job Description requirements!");
            return;
        }

        setIsAnalyzing(true);
        setReport(null);

        try {
            const result = await ApiService.analyze(selectedFile, jdText);
            setReport(result);
            displayToast("ATS Resume analysis completed successfully!");
        } catch (err) {
            if (err.message.includes("upgrade to Premium") || err.message.includes("free resume analyses")) {
                if (confirm("You have used all 3 free resume analyses.\n\nClick OK to upgrade to Premium and get unlimited/50 daily analyses!")) {
                    router.push('/subscription');
                    return;
                }
            }
            displayToast(`Analysis failed: ${err.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // 6. Copy Cover Letter
    const copyCoverLetter = () => {
        const text = report?.ai_cover_letter || '';
        navigator.clipboard.writeText(text).then(() => {
            displayToast("Cover letter copied to clipboard!");
        }).catch(() => {
            displayToast("Failed to copy cover letter.");
        });
    };

    // 7. Download PDF Report redirect
    const downloadPdfReport = () => {
        if (!report?.id) return;
        displayToast("Opening report PDF document download...");
        window.open(`${ApiService.API_BASE_URL}/download-report/${report.id}?token=${AuthService.getToken()}`, '_self');
    };

    // AI Resume Improvement Handlers
    const handleImproveResumeClick = async () => {
        const resumeText = report?.resume_text || '';
        if (!resumeText) {
            displayToast("Resume text is empty or not loaded yet.");
            return;
        }

        setIsAnalyzing(true);
        try {
            const missingKeywords = report?.missing_keywords || [];
            const suggestions = report?.suggestions || [];

            const result = await ApiService.improve(resumeText, missingKeywords, suggestions, jobDescription);

            setOriginalText(result.original_text);
            setImprovedText(result.improved_text);
            setImprovedScore(result.improved_score);
            setShowImprovementView(true);
            displayToast("AI Resume suggestions compiled successfully!");
        } catch (e) {
            displayToast(`Failed to improve resume: ${e.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleDownloadImprovedPdf = async () => {
        if (!improvedText) {
            displayToast("No improved text to download.");
            return;
        }

        try {
            displayToast("Generating your formatted resume PDF...");
            let userName = "Candidate";
            try {
                const profile = await ApiService.fetchProfile();
                userName = profile.name || "Candidate";
            } catch (e) {
                // Ignore profile fetch issues
            }

            await ApiService.downloadImprovedPdf(improvedText, userName);
            displayToast("Resume PDF downloaded successfully!");
        } catch (e) {
            displayToast(`PDF Generation failed: ${e.message}`);
        }
    };

    // SVG Progress settings
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const score = report?.ats_score || 0;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    let scoreBadgeClass = 'bronze';
    let scoreBadgeText = 'Action Required';
    let progressStrokeColor = 'var(--danger-accent)';

    if (score >= 80) {
        scoreBadgeClass = 'gold';
        scoreBadgeText = 'Excellent Match';
        progressStrokeColor = 'var(--success-accent)';
    } else if (score >= 60) {
        scoreBadgeClass = 'silver';
        scoreBadgeText = 'Good Alignment';
        progressStrokeColor = 'var(--warning-accent)';
    }

    return (
        <AppShell title="ATS Optimizer Dashboard">
            {showImprovementView ? (
                /* Split-screen AI Optimizer Panel */
                <div className="card mobile-padding-card" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 style={{ margin: 0 }}><i className="fa-solid fa-wand-magic-sparkles text-gradient"></i> AI Resume Optimizer</h3>
                            <p className="card-desc" style={{ margin: 0, marginTop: '4px' }}>AI has rewritten experience bullets into metric-driven STAR format, injected missing keywords, and optimized your summary.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div className="score-badge gold" style={{ marginTop: 0, height: '38px', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                                Optimized ATS Score: {improvedScore}% (Original: {report?.ats_score}%)
                            </div>
                            <button className="action-btn secondary-btn" onClick={() => setShowImprovementView(false)} style={{ height: '38px' }}>
                                <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
                            </button>
                            <button className="action-btn primary-btn" onClick={handleDownloadImprovedPdf} style={{ height: '38px' }}>
                                <i className="fa-solid fa-file-pdf"></i> Download Improved PDF
                            </button>
                        </div>
                    </div>

                    <div className="responsive-two-column-grid">
                        {/* Left Column: Before */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Before (Original Resume)</span>
                            </div>
                            <textarea
                                className="custom-textarea ai-editor-textarea"
                                style={{ backgroundColor: 'rgba(106, 88, 62, 0.02)', cursor: 'not-allowed', opacity: 0.8 }}
                                value={originalText || report?.resume_text || "Original resume text not loaded."}
                                readOnly
                            ></textarea>
                        </div>

                        {/* Right Column: After */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--success-accent)' }}>After (AI Suggestions - Editable)</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}><i className="fa-solid fa-pen"></i> Tweak & edit directly</span>
                            </div>
                            <textarea
                                className="custom-textarea ai-editor-textarea"
                                style={{ borderColor: 'var(--success-accent)' }}
                                value={improvedText}
                                onChange={(e) => setImprovedText(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="dashboard-grid">

                        {/* Left Column: Inputs */}
                        <div className="input-pane-column">
                            <div className="card">
                                <h3><i className="fa-solid fa-cloud-arrow-up text-gradient"></i> 1. Upload Your Resume</h3>
                                <p className="card-desc">Drag & drop or select a PDF or DOCX file. The system will extract text automatically.</p>

                                {/* File Drag Box */}
                                {!selectedFile ? (
                                    <div
                                        className={`uploader-box ${dragOver ? 'dragover' : ''}`}
                                        id="drop-zone"
                                        onClick={() => fileInputRef.current.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setDragOver(false);
                                            handleFileSelection(e.dataTransfer.files[0]);
                                        }}
                                    >
                                        <i className="fa-regular fa-file-pdf uploader-icon"></i>
                                        <span className="uploader-title">Drag & Drop Resume File Here</span>
                                        <span className="uploader-subtitle">Supports PDF, DOCX, or TXT (Max 5MB)</span>
                                        <span className="action-btn secondary-btn" style={{ height: '34px' }}>Select File</span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept=".pdf,.docx,.txt"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                ) : (
                                    /* Selected File Indicator */
                                    <div id="selected-file-indicator" style={{ textAlign: 'center' }}>
                                        <div className="file-pill" id="file-pill-element">
                                            <i className="fa-regular fa-file-lines"></i>
                                            <span id="file-name-text">{selectedFile.name}</span>
                                            <i className="fa-solid fa-circle-xmark" id="btn-remove-file" title="Remove File" onClick={removeFile}></i>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3><i className="fa-solid fa-briefcase text-gradient"></i> 2. Target Job Description</h3>
                                </div>
                                <p className="card-desc">Select a target IT role from the dropdown below to load its Job Description, or manually paste yours.</p>

                                <div style={{ marginBottom: '16px' }}>
                                    <div className="select-wrapper">
                                        <select
                                            id="select-job-role"
                                            className="custom-select"
                                            value={selectedRole}
                                            onChange={handleRoleChange}
                                        >
                                            <option value="" disabled>-- Choose target IT role --</option>
                                            {Object.keys(JOBS_DATA).sort().map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                        <i className="fa-solid fa-chevron-down select-icon"></i>
                                    </div>
                                </div>

                                <div className="textarea-group">
                                    <textarea
                                        id="job-description-input"
                                        className="custom-textarea"
                                        placeholder="Paste target requirements here..."
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    ></textarea>
                                    <div className="textarea-footer" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                        <span id="jd-word-count">Words: {wordCount}</span>
                                        <span id="jd-char-count">{charCount} / 4000 characters</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions bar */}
                            <div style={{ marginBottom: '28px' }}>
                                <button
                                    className="action-btn primary-btn"
                                    id="btn-submit-analysis"
                                    style={{ width: '100%', height: '50px', fontSize: '1.05rem' }}
                                    onClick={handleSubmitAnalysis}
                                    disabled={isAnalyzing}
                                >
                                    {isAnalyzing ? (
                                        <><i className="fa-solid fa-circle-notch fa-spin"></i> Analyzing Match Factors...</>
                                    ) : (
                                        <><i className="fa-solid fa-wand-magic-sparkles"></i> Optimize Resume & Analyze Match</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Initial Guidelines & Loading States */}
                        <div className="results-pane-column">
                            {!report && !isAnalyzing && (
                                <div className="card" id="empty-state-card" style={{ textAlign: 'center', padding: '60px 30px' }}>
                                    <i className="fa-solid fa-file-shield" style={{ fontSize: '3.5rem', color: 'var(--text-muted)', marginBottom: '20px' }}></i>
                                    <h3>Analysis Results Blueprint</h3>
                                    <p className="card-desc" style={{ maxWidth: '320px', margin: '0 auto' }}>Upload your resume and paste a target job description on the left. The AI scoring breakdown, gap evaluations, and ATS recommendations will appear here.</p>
                                </div>
                            )}

                            {isAnalyzing && (
                                <div className="card" id="loading-state-card" style={{ textAlign: 'center', padding: '80px 30px' }}>
                                    <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '3.5rem', color: 'var(--primary-glow)', marginBottom: '20px' }}></i>
                                    <h3>Extracting & Matching Profile...</h3>
                                    <p className="card-desc" style={{ maxWidth: '320px', margin: '0 auto' }}>Advanced sentence embedding models are tokenizing your skills and calculating weighted cosine alignment scores.</p>
                                </div>
                            )}

                            {/* ATS REPORT OUTPUT CONTAINER */}
                            {report && (
                                <div id="analysis-report-container">
                                    {/* Primary Circle Score */}
                                    <div className="card score-circle-card" style={{ textAlign: 'center' }}>
                                        <h3>ATS Compatibility</h3>
                                        <div className="score-circle-wrapper">
                                            <div className="score-progress-ring">
                                                <svg width="140" height="140">
                                                    <circle stroke="#1e293d" strokeWidth="10" fill="transparent" r="60" cx="70" cy="70" />
                                                    <circle
                                                        id="ats-progress-ring"
                                                        stroke={progressStrokeColor}
                                                        strokeWidth="10"
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={strokeDashoffset}
                                                        fill="transparent"
                                                        r="60"
                                                        cx="70"
                                                        cy="70"
                                                        className="progress-ring-circle"
                                                        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                                                    />
                                                </svg>
                                                <div className="score-value-text" id="ats-score-display">{score}</div>
                                            </div>
                                            <div className={`score-badge ${scoreBadgeClass}`} id="ats-badge-display">{scoreBadgeText}</div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                            <button className="action-btn secondary-btn" id="btn-download-pdf-report" onClick={downloadPdfReport} style={{ height: '38px' }}>
                                                <i className="fa-solid fa-file-pdf"></i> Download PDF
                                            </button>
                                            <button className="action-btn primary-btn" id="btn-improve-resume" onClick={handleImproveResumeClick} style={{ height: '38px' }}>
                                                <i className="fa-solid fa-wand-magic-sparkles"></i> Improve Resume
                                            </button>
                                        </div>
                                    </div>

                                    {/* Integrity Checklist */}
                                    <div className="card">
                                        <h3>ATS formatting check</h3>
                                        <ul className="icon-list" id="format-checklist-display">
                                            <li>
                                                {report.format_check?.has_contact_info ? (
                                                    <i className="fa-solid fa-circle-check list-icon-check"></i>
                                                ) : (
                                                    <i className="fa-solid fa-circle-xmark list-icon-times"></i>
                                                )}
                                                <span>Contact Details Identified</span>
                                            </li>
                                            <li>
                                                {report.format_check?.has_summary ? (
                                                    <i className="fa-solid fa-circle-check list-icon-check"></i>
                                                ) : (
                                                    <i className="fa-solid fa-circle-xmark list-icon-times"></i>
                                                )}
                                                <span>Professional Summary Present</span>
                                            </li>
                                            <li>
                                                {report.format_check?.has_experience ? (
                                                    <i className="fa-solid fa-circle-check list-icon-check"></i>
                                                ) : (
                                                    <i className="fa-solid fa-circle-xmark list-icon-times"></i>
                                                )}
                                                <span>Experience Details Validated</span>
                                            </li>
                                            <li>
                                                {report.format_check?.has_education ? (
                                                    <i className="fa-solid fa-circle-check list-icon-check"></i>
                                                ) : (
                                                    <i className="fa-solid fa-circle-xmark list-icon-times"></i>
                                                )}
                                                <span>Education Framework Found</span>
                                            </li>
                                            <li>
                                                {report.format_check?.is_length_optimal ? (
                                                    <i className="fa-solid fa-circle-check list-icon-check"></i>
                                                ) : (
                                                    <i className="fa-solid fa-circle-xmark list-icon-times"></i>
                                                )}
                                                <span>Optimal Resume Length</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* BOTTOM GRID ROW FOR EXPANDED ANALYSIS */}
                    {report && (
                        <div id="expanded-analysis-row" style={{ maxWidth: '1400px', margin: '0 auto', marginTop: '28px' }}>
                            <div className="responsive-two-column-grid">

                                {/* Col 1: Keywords and recommendations */}
                                <div>
                                    {/* Score breakdown Table */}
                                    <div className="card">
                                        <h3>Weighted Score Details</h3>
                                        <table className="optimizations-table">
                                            <thead>
                                                <tr>
                                                    <th>Evaluation Criteria</th>
                                                    <th>Weight</th>
                                                    <th>Result Score</th>
                                                </tr>
                                            </thead>
                                            <tbody id="score-breakdown-rows">
                                                <tr>
                                                    <td style={{ fontWeight: 500 }}>Skills Matching Index</td>
                                                    <td>40%</td>
                                                    <td style={{ fontWeight: 700, color: 'var(--primary-glow)' }}>{report.scores_breakdown?.skills_match || 0}%</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 500 }}>Experience Alignment</td>
                                                    <td>30%</td>
                                                    <td style={{ fontWeight: 700, color: 'var(--primary-glow)' }}>{report.scores_breakdown?.experience_match || 0}%</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 500 }}>Keyword Synonyms Overlap</td>
                                                    <td>20%</td>
                                                    <td style={{ fontWeight: 700, color: 'var(--primary-glow)' }}>{report.scores_breakdown?.keyword_match || 0}%</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 500 }}>Degree & Education Match</td>
                                                    <td>10%</td>
                                                    <td style={{ fontWeight: 700, color: 'var(--primary-glow)' }}>{report.scores_breakdown?.education_match || 0}%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Suggestions */}
                                    <div className="card">
                                        <h3>Actionable Resume Improvements</h3>
                                        <ul className="icon-list" id="suggestions-list-display">
                                            {report.suggestions && report.suggestions.length > 0 ? (
                                                report.suggestions.map((s, idx) => (
                                                    <li key={idx}>
                                                        <i className="fa-solid fa-circle-dot list-icon-bullet"></i>
                                                        <span>{s}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>
                                                    <i className="fa-solid fa-circle-check list-icon-check"></i>
                                                    <span>Perfect score! No formatting adjustments recommended.</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Keyword Optimizations */}
                                    <div className="card">
                                        <h3>Keyword Gap Optimizer</h3>
                                        <table className="optimizations-table">
                                            <thead>
                                                <tr>
                                                    <th>Missing Keyword</th>
                                                    <th>Status</th>
                                                    <th>Fix Recommendation</th>
                                                </tr>
                                            </thead>
                                            <tbody id="keyword-optimizations-rows">
                                                {report.keyword_optimizations && report.keyword_optimizations.length > 0 ? (
                                                    report.keyword_optimizations.map((opt, idx) => (
                                                        <tr key={idx}>
                                                            <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{opt.keyword}</td>
                                                            <td>
                                                                <span className={`badge-tag ${opt.status === 'Matched' ? 'match' : 'missing'}`}>
                                                                    {opt.status}
                                                                </span>
                                                            </td>
                                                            <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.fix}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                                            No keyword optimization gaps identified.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Col 2: Skills tags & Generative cover letter */}
                                <div>
                                    {/* Skills Tags */}
                                    <div className="card">
                                        <h3>Discovered Skill Competencies</h3>
                                        <div style={{ marginBottom: '15px' }}>
                                            <h4 className="uploader-subtitle" style={{ marginBottom: '6px', transform: 'uppercase', fontWeight: 700 }}>Matched Skills</h4>
                                            <div className="keywords-badges-container" id="matched-skills-tags">
                                                {report.matched_skills && report.matched_skills.length > 0 ? (
                                                    report.matched_skills.map((skill, idx) => (
                                                        <span key={idx} className="badge-tag match">{skill}</span>
                                                    ))
                                                ) : (
                                                    <span className="uploader-subtitle">No matching skills detected.</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="uploader-subtitle" style={{ marginBottom: '6px', transform: 'uppercase', fontWeight: 700 }}>Missing Job Keywords</h4>
                                            <div className="keywords-badges-container" id="missing-skills-tags">
                                                {report.missing_keywords && report.missing_keywords.length > 0 ? (
                                                    report.missing_keywords.map((skill, idx) => (
                                                        <span key={idx} className="badge-tag missing">{skill}</span>
                                                    ))
                                                ) : (
                                                    <span className="uploader-subtitle" style={{ color: 'var(--success-accent)', fontWeight: 700 }}>
                                                        <i className="fa-solid fa-circle-check"></i> 100% Core Skill Match!
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cover Letter */}
                                    <div className="card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                            <h3 style={{ marginBottom: 0 }}><i className="fa-solid fa-pen-nib text-gradient"></i> Generative AI Cover Letter</h3>
                                            <button className="panel-action-btn" id="btn-copy-cover-letter" onClick={copyCoverLetter} style={{ padding: '4px 10px', backgroundColor: 'var(--card-bg)', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                                                <i className="fa-regular fa-copy"></i> Copy Letter
                                            </button>
                                        </div>
                                        <p className="card-desc">AI-generated cover letter based on your matched resume experiences and targeted job description coordinates.</p>
                                        <div className="cover-letter-preview" id="cover-letter-text">
                                            {report.ai_cover_letter || 'Cover letter details not generated.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Notification Toast */}
            <div className={`toast-notice ${showToast ? 'show' : ''}`} id="toast-notice">
                <span className="toast-message">{toastMessage}</span>
            </div>
        </AppShell>
    );
}
