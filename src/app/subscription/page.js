'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';

export default function SubscriptionPage() {
    return (
        <AppShell title="Subscription Plans">
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
                    Choose Your Plan
                </h2>
                <p className="card-desc" style={{ maxWidth: '500px', margin: '0 auto 40px auto' }}>
                    Unlock production-grade AI keyword gap optimizations, custom cover letter builds, and PDF reports downloads.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
                    {/* Free Plan Card */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 0 }}>
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '6px' }}>Free Basic</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Initial sandbox testing tier</p>
                        </div>
                        <div style={{ margin: '20px 0', fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)' }}>
                            ₹0 <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/ forever</span>
                        </div>
                        <ul className="icon-list" style={{ margin: '20px 0', flexGrow: 1, textAlign: 'left' }}>
                            <li>
                                <i className="fa-solid fa-circle-check list-icon-check"></i>
                                <span>Up to 3 free resume analyses</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-check list-icon-check"></i>
                                <span>ATS Cosine Similarity Scorer</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-xmark list-icon-times"></i>
                                <span>No PDF report downloads</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-xmark list-icon-times"></i>
                                <span>No custom cover letter builds</span>
                            </li>
                        </ul>
                        <button className="action-btn secondary-btn" style={{ width: '100%', cursor: 'default' }} disabled>
                            Active Plan
                        </button>
                    </div>

                    {/* Premium Plan Card */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderColor: 'var(--primary-glow)', boxShadow: 'var(--shadow-premium), var(--shadow-glow)', position: 'relative', marginBottom: 0 }}>
                        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                            <span className="badge-tag gold" style={{ fontSize: '0.65rem', padding: '4px 10px', fontWeight: 700 }}>Most Popular</span>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '6px', color: 'var(--primary-glow)' }}>Monthly Premium</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>For active job hunters</p>
                        </div>
                        <div style={{ margin: '20px 0', fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)' }}>
                            ₹199 <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/ month</span>
                        </div>
                        <ul className="icon-list" style={{ margin: '20px 0', flexGrow: 1, textAlign: 'left' }}>
                            <li>
                                <i className="fa-solid fa-circle-check list-icon-check"></i>
                                <span style={{ fontWeight: 600 }}>50 resume analyses per day</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-check list-icon-check"></i>
                                <span>Complete Keyword Gap Optimizer</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-check list-icon-check"></i>
                                <span>AI-Generated Cover Letters</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-check list-icon-check"></i>
                                <span>Beautiful PDF report downloads</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-check list-icon-check"></i>
                                <span>Priority email support tickets</span>
                            </li>
                        </ul>
                        <Link href="/payment" className="action-btn primary-btn" style={{ width: '100%', textDecoration: 'none' }}>
                            Upgrade to Premium
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
