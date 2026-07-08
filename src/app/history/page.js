'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { ApiService } from '@/utils/api';
import { AuthService } from '@/utils/auth';

export default function HistoryPage() {
    const router = useRouter();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const logs = await ApiService.fetchHistory();
                setHistory(logs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, []);

    const downloadPDF = (id) => {
        try {
            window.open(`${ApiService.API_BASE_URL}/download-report/${id}?token=${AuthService.getToken()}`, '_self');
        } catch (err) {
            alert("Failed to download PDF report.");
        }
    };

    const loadReportToDashboard = (id) => {
        sessionStorage.setItem('view_report_id', id);
        router.push('/dashboard');
    };

    return (
        <AppShell title="ATS Historical Analysis Logs">
            <div className="card mobile-padding-card" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <h3><i className="fa-solid fa-clock-rotate-left text-gradient"></i> Previous ATS Analyses</h3>
                <p className="card-desc">Revisit and review the compatibility outputs and PDF downloads for all past resume optimization processes.</p>

                <div style={{ overflowX: 'auto' }}>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date Analyzed</th>
                                <th>Resume Name</th>
                                <th>ATS Score</th>
                                <th>Top Missing Keywords</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'block' }}></i> Loading historical logs...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--danger-accent)' }}>
                                        <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2rem', marginBottom: '10px', display: 'block' }}></i> Failed to load analysis history logs: {error}
                                    </td>
                                </tr>
                            ) : history.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                        <i className="fa-regular fa-folder-open" style={{ fontSize: '2rem', marginBottom: '10px', display: 'block' }}></i> No saved analysis reports found. Upload your first resume to populate logs!
                                    </td>
                                </tr>
                            ) : (
                                history.map((item) => {
                                    const score = item.ats_score || 0;
                                    let scoreClass = 'bronze';
                                    if (score >= 80) scoreClass = 'gold';
                                    else if (score >= 60) scoreClass = 'silver';

                                    const keywords = item.missing_keywords && item.missing_keywords.length > 0 ? (
                                        item.missing_keywords.slice(0, 3).map((k) => (
                                            <span key={k} className="badge-tag missing" style={{ fontSize: '0.65rem', marginRight: '4px', padding: '2px 6px' }}>{k}</span>
                                        ))
                                    ) : (
                                        <span className="text-green" style={{ color: 'var(--success-accent)', fontWeight: 'bold' }}><i className="fa-solid fa-circle-check"></i> None</span>
                                    );

                                    return (
                                        <tr key={item.id}>
                                            <td style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item.timestamp || 'N/A'}</td>
                                            <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem' }}><i className="fa-regular fa-file-pdf" style={{ color: 'var(--danger-accent)', marginRight: '6px' }}></i> {item.filename || 'resume.pdf'}</td>
                                            <td>
                                                <span className={`score-badge ${scoreClass}`} style={{ margin: 0, padding: '3px 10px', fontSize: '0.72rem' }}>{score}%</span>
                                            </td>
                                            <td>{keywords}</td>
                                            <td>
                                                <button className="action-btn secondary-btn" style={{ height: '30px', padding: '0 10px', fontSize: '0.76rem', marginRight: '6px', cursor: 'pointer' }} onClick={() => downloadPDF(item.id)}>
                                                    <i className="fa-solid fa-download"></i> PDF
                                                </button>
                                                <button className="action-btn primary-btn" style={{ height: '30px', padding: '0 10px', fontSize: '0.76rem', cursor: 'pointer' }} onClick={() => loadReportToDashboard(item.id)}>
                                                    <i className="fa-solid fa-eye"></i> View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppShell>
    );
}
