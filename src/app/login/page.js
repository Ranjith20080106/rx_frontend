'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ApiService } from '@/utils/api';
import { AuthService } from '@/utils/auth';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Tab state: 'login' or 'register'
    const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') === 'register' ? 'register' : 'login');

    // Input States
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    // Password Visibility toggle states
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    // UI Loading & Message states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Redirect immediately if already logged in
        if (AuthService.isAuthenticated()) {
            router.push('/dashboard');
        }
    }, [router]);

    const displayToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3200);
    };

    // Sign In Submission handler
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = await ApiService.login(loginEmail, loginPassword);
            AuthService.saveSession(data.access_token, data.user);
            displayToast("Signed in successfully!");
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } catch (err) {
            displayToast(`Authentication failed: ${err.message}`);
            setIsSubmitting(false);
        }
    };

    // Register Submission handler
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        
        // Double check strength validation
        const score = (registerPassword.length >= 8 ? 1 : 0) +
                      (/[A-Z]/.test(registerPassword) ? 1 : 0) +
                      (/[a-z]/.test(registerPassword) ? 1 : 0) +
                      (/[0-9]/.test(registerPassword) ? 1 : 0) +
                      (/[@#$!%*?&_#^-]/.test(registerPassword) ? 1 : 0);
                      
        if (score < 5) {
            displayToast("Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }

        setIsSubmitting(true);
        try {
            const data = await ApiService.register(registerName, registerEmail, registerPassword);
            AuthService.saveSession(data.access_token, data.user);
            displayToast("Account registered successfully!");
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } catch (err) {
            displayToast(`Registration failed: ${err.message}`);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-panel-wrapper">
            <div className="auth-card">
                {/* Branding Header */}
                <div className="auth-header">
                    <div className="logo-icon" style={{ margin: '0 auto 12px auto' }}>
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <h2>Resume<span>X</span></h2>
                    <p className="uploader-subtitle" style={{ marginTop: '4px' }}>Advanced ATS Resume Optimization Suite</p>
                </div>

                {/* Tab Selectors */}
                <div className="auth-tabs">
                    <button 
                        className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Sign In
                    </button>
                    <button 
                        className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                    <form id="login-form" className="auth-form active" onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label htmlFor="login-email">Email Address</label>
                            <input 
                                type="email" 
                                id="login-email" 
                                className="custom-input" 
                                placeholder="alex@example.com" 
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <div className="password-wrapper" style={{ position: 'relative' }}>
                                <input 
                                    type={showLoginPassword ? "text" : "password"} 
                                    id="login-password" 
                                    className="custom-input" 
                                    style={{ width: '100%', paddingRight: '40px' }}
                                    placeholder="••••••••" 
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required 
                                />
                                <button 
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-muted)',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    <i className={showLoginPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="action-btn primary-btn" style={{ width: '100%', marginTop: '10px' }} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <><i className="fa-solid fa-circle-notch fa-spin"></i> Authenticating...</>
                            ) : (
                                <><i className="fa-solid fa-right-to-bracket"></i> Sign In to Dashboard</>
                            )}
                        </button>
                    </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                    <form id="register-form" className="auth-form active" onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <label htmlFor="register-name">Full Name</label>
                            <input 
                                type="text" 
                                id="register-name" 
                                className="custom-input" 
                                placeholder="Alex Rivera" 
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email">Email Address</label>
                            <input 
                                type="email" 
                                id="register-email" 
                                className="custom-input" 
                                placeholder="alex@example.com" 
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Create Password</label>
                            <div className="password-wrapper" style={{ position: 'relative' }}>
                                <input 
                                    type={showRegisterPassword ? "text" : "password"} 
                                    id="register-password" 
                                    className="custom-input" 
                                    style={{ width: '100%', paddingRight: '40px' }}
                                    placeholder="••••••••" 
                                    minLength={8}
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required 
                                />
                                <button 
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-muted)',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    <i className={showRegisterPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                </button>
                            </div>
                            {registerPassword.length > 0 && (() => {
                                const criteria = {
                                    length: registerPassword.length >= 8,
                                    uppercase: /[A-Z]/.test(registerPassword),
                                    lowercase: /[a-z]/.test(registerPassword),
                                    number: /[0-9]/.test(registerPassword),
                                    special: /[@#$!%*?&_#^-]/.test(registerPassword)
                                };
                                const metCount = Object.values(criteria).filter(Boolean).length;
                                let strengthText = 'Weak';
                                let strengthClass = 'weak';
                                if (metCount > 2 && metCount <= 4) {
                                    strengthText = 'Medium';
                                    strengthClass = 'medium';
                                } else if (metCount === 5) {
                                    strengthText = 'Strong';
                                    strengthClass = 'strong';
                                }
                                
                                return (
                                    <div className="password-strength-container">
                                        <div className="strength-label">
                                            <span>Password Strength:</span>
                                            <span className={`strength-level ${strengthClass}`}>{strengthText}</span>
                                        </div>
                                        <div className="strength-bar-bg">
                                            <div className={`strength-bar ${strengthClass}`}></div>
                                        </div>
                                        <ul className="password-requirements-list">
                                            <li className={criteria.length ? 'met' : ''}>
                                                <i className={criteria.length ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}></i>
                                                At least 8 characters
                                            </li>
                                            <li className={criteria.uppercase ? 'met' : ''}>
                                                <i className={criteria.uppercase ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}></i>
                                                At least 1 uppercase letter (A-Z)
                                            </li>
                                            <li className={criteria.lowercase ? 'met' : ''}>
                                                <i className={criteria.lowercase ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}></i>
                                                At least 1 lowercase letter (a-z)
                                            </li>
                                            <li className={criteria.number ? 'met' : ''}>
                                                <i className={criteria.number ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}></i>
                                                At least 1 number (0-9)
                                            </li>
                                            <li className={criteria.special ? 'met' : ''}>
                                                <i className={criteria.special ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}></i>
                                                At least 1 special character (@, #, $, %, &, etc.)
                                            </li>
                                        </ul>
                                    </div>
                                );
                            })()}
                        </div>
                        <button 
                            type="submit" 
                            className="action-btn primary-btn" 
                            style={{ width: '100%', marginTop: '10px' }} 
                            disabled={
                                isSubmitting || 
                                registerPassword.length < 8 ||
                                !/[A-Z]/.test(registerPassword) ||
                                !/[a-z]/.test(registerPassword) ||
                                !/[0-9]/.test(registerPassword) ||
                                !/[@#$!%*?&_#^-]/.test(registerPassword)
                            }
                        >
                            {isSubmitting ? (
                                <><i className="fa-solid fa-circle-notch fa-spin"></i> Creating Account...</>
                            ) : (
                                <><i className="fa-solid fa-user-plus"></i> Create Account</>
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* Notification Toast */}
            <div className={`toast-notice ${showToast ? 'show' : ''}`} id="toast-notice">
                <span className="toast-message">{toastMessage}</span>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-app)' }}>
                <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-glow)' }}></i>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
