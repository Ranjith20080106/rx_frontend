import { AuthService } from './auth';

export class ApiService {
    static API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

    static getHeaders() {
        const token = AuthService.getToken();
        const headers = {
            'Accept': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    static async register(name, email, password) {
        const response = await fetch(`${this.API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Registration failed');
        }
        return await response.json();
    }

    static async login(email, password) {
        const response = await fetch(`${this.API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Incorrect credentials');
        }
        return await response.json();
    }

    static async analyze(file, jobDescription) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('job_description', jobDescription);

        const response = await fetch(`${this.API_BASE_URL}/analyze`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: formData
        });

        if (!response.ok) {
            if (response.status === 401) {
                AuthService.clearSession();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return;
            }
            const data = await response.json();
            throw new Error(data.detail || 'Resume analysis failed.');
        }
        return await response.json();
    }

    static async fetchHistory() {
        const response = await fetch(`${this.API_BASE_URL}/history`, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                AuthService.clearSession();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return;
            }
            throw new Error("History request failed");
        }
        return await response.json();
    }

    static async fetchProfile() {
        const response = await fetch(`${this.API_BASE_URL}/profile`, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                AuthService.clearSession();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return;
            }
            throw new Error("Profile request failed");
        }
        return await response.json();
    }

    static async upgradeSubscription() {
        const response = await fetch(`${this.API_BASE_URL}/subscription/upgrade`, {
            method: 'POST',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                AuthService.clearSession();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return;
            }
            const data = await response.json();
            throw new Error(data.detail || 'Subscription upgrade failed.');
        }
        return await response.json();
    }

    // --- CLIENT-SIDE OFFLINE ANALYSIS ENGINE MOCK ---
    static simulateLocalAnalysis(filename, jd) {
        const cleanJd = jd.toLowerCase();
        const skillsToCheck = ['react', 'node', 'python', 'aws', 'docker', 'sql', 'typescript', 'fastapi', 'kubernetes', 'graphql', 'mongodb', 'agile', 'scrum', 'ci/cd', 'git', 'linux'];
        const matched = skillsToCheck.filter(s => cleanJd.includes(s));
        const missing = skillsToCheck.filter(s => !cleanJd.includes(s)).slice(0, 5);
        
        const matchedUpper = matched.map(s => s.toUpperCase());
        const missingUpper = missing.map(s => s.toUpperCase());
        
        const skillsScore = matched.length > 0 ? (matched.length / skillsToCheck.length) * 100 : 70;
        const finalScore = Math.round(Math.max(45, Math.min(92, skillsScore + 15)));
        
        const suggestions = [
            `Add missing job description keywords: ${missingUpper.slice(0, 3).join(', ')}.`,
            "Optimize resume bullet points to list action metrics (STAR method).",
            "Double check that contact info and phone coordinates are present in the header."
        ];
        
        const optimizations = [];
        missing.forEach(s => {
            optimizations.push({ keyword: s.toUpperCase(), status: "Missing", fix: "Add this core competency under your Skills or Experience section to increase ATS indexing match." });
        });
        matched.forEach(s => {
            optimizations.push({ keyword: s.toUpperCase(), status: "Matched", fix: "Well represented! Ensure this skill is linked to a concrete professional project outcome." });
        });

        const report = {
            id: `local_${Date.now()}`,
            user_id: AuthService.getUser()?.id || "sandbox_id",
            ats_score: finalScore,
            scores_breakdown: {
                skills_match: Math.round(skillsScore),
                experience_match: Math.round(skillsScore + 8),
                keyword_match: Math.round(skillsScore - 5),
                education_match: 90.0
            },
            matched_skills: matchedUpper,
            missing_keywords: missingUpper,
            experience_summary: "Moderately aligned experience layout",
            education_summary: "Degree requirements fully matched",
            format_check: {
                has_contact_info: true,
                has_summary: true,
                has_experience: true,
                has_education: true,
                is_length_optimal: true,
                issues: []
            },
            suggestions: suggestions,
            keyword_optimizations: optimizations,
            ai_cover_letter: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position. As a developer with skills including ${matchedUpper.slice(0,3).join(', ')}, I am confident that I can make a high-impact contribution.\n\nSincerely,\n${AuthService.getUser()?.name || 'Sandbox Candidate'}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            filename: filename
        };

        const history = this.getLocalHistoryMock();
        history.unshift(report);
        if (typeof window !== 'undefined') {
            localStorage.setItem('resumex_history_db', JSON.stringify(history));
        }

        return report;
    }

    static getLocalHistoryMock() {
        if (typeof window === 'undefined') return [];
        const db = localStorage.getItem('resumex_history_db');
        if (db) return JSON.parse(db);
        
        const defaultHistory = [
            {
                id: "sandbox_mock_1",
                filename: "Alex_Rivera_Resume.pdf",
                ats_score: 82,
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                matched_skills: ["REACT", "NODE.JS", "PYTHON", "AWS", "DOCKER", "SQL", "TYPESCRIPT", "FASTAPI"],
                missing_keywords: ["KUBERNETES", "GRAPHQL", "PYTORCH"],
                scores_breakdown: { skills_match: 80, experience_match: 85, keyword_match: 78, education_match: 90 },
                format_check: { has_contact_info: true, has_summary: true, has_experience: true, has_education: true, is_length_optimal: true, issues: [] },
                suggestions: ["Incorporate missing core skills: KUBERNETES, GRAPHQL, PYTORCH.", "Optimize experience bullets to list action metrics."],
                keyword_optimizations: [
                    { keyword: "KUBERNETES", status: "Missing", fix: "Add this core competency under your Skills or Experience section." }
                ],
                ai_cover_letter: "Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position...",
            }
        ];
        localStorage.setItem('resumex_history_db', JSON.stringify(defaultHistory));
        return defaultHistory;
    }

    static async improve(resumeText, missingKeywords, suggestions, jobDescription) {
        const response = await fetch(`${this.API_BASE_URL}/improve-resume`, {
            method: 'POST',
            headers: {
                ...this.getHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resume_text: resumeText,
                missing_keywords: missingKeywords,
                suggestions: suggestions,
                job_description: jobDescription
            })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Resume improvement request failed.');
        }
        return await response.json();
    }

    static async downloadImprovedPdf(resumeText, name) {
        const response = await fetch(`${this.API_BASE_URL}/download-improved-pdf`, {
            method: 'POST',
            headers: {
                ...this.getHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resume_text: resumeText,
                name: name
            })
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to download improved resume PDF.');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Improved_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }
}

