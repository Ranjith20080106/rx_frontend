'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { ApiService } from '@/utils/api';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await ApiService.fetchProfile();
                setProfile(data);
            } catch (err) {
                console.error("Failed to load user profile statistics:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    if (loading) {
        return (
            <AppShell title="User Profile & Analytics">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-glow)' }}></i>
                </div>
            </AppShell>
        );
    }

    const initials = profile?.name ? 
        profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 
        'U';

    return (
        <AppShell title="User Profile & Analytics">
            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                
                {/* Profile Header card */}
                {profile && (
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '32px' }}>
                        <div className="user-avatar" style={{ width: '76px', height: '76px', fontSize: '2.2rem', borderRadius: '18px' }} id="profile-avatar">
                            {initials}
                        </div>
                        <div>
                            <h2 id="profile-name" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.6rem', lineHeight: 1.2 }}>
                                {profile.name || 'Candidate Name'}
                            </h2>
                            <p id="profile-email" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '2px' }}>
                                {profile.email || 'email@example.com'}
                            </p>
                            <span className="score-badge gold" style={{ display: 'inline-block', marginTop: '10px' }} id="profile-joined-badge">
                                Joined {profile.joined || 'May 2026'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Metrics Row */}
                {profile && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                        {/* Metric 1 */}
                        <div className="card" style={{ textAlign: 'center', padding: '24px', marginBottom: 0 }}>
                            <i className="fa-solid fa-file-invoice" style={{ fontSize: '2rem', color: 'var(--primary-glow)', marginBottom: '12px', display: 'block' }}></i>
                            <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>Resumes Optimized</h4>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }} id="stat-total">
                                {profile.total_analyzed || 0}
                            </div>
                        </div>
                        
                        {/* Metric 2 */}
                        <div className="card" style={{ textAlign: 'center', padding: '24px', marginBottom: 0 }}>
                            <i className="fa-solid fa-graduation-cap" style={{ fontSize: '2rem', color: 'var(--secondary-accent)', marginBottom: '12px', display: 'block' }}></i>
                            <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>Average Score</h4>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }} id="stat-avg">
                                {profile.average_score || 0}%
                            </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="card" style={{ textAlign: 'center', padding: '24px', marginBottom: 0 }}>
                            <i className="fa-solid fa-trophy" style={{ fontSize: '2rem', color: 'var(--success-accent)', marginBottom: '12px', display: 'block' }}></i>
                            <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>Highest Score Achieved</h4>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }} id="stat-max">
                                {profile.max_score || 0}%
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional actions */}
                <div className="card">
                    <h3>Account & Safety Options</h3>
                    <p className="card-desc">Current environment running under local sandbox servers. All session hashes are compiled using industry standard JWT signatures.</p>
                    <div style={{ display: 'flex', gap: '14px', marginTop: '14px' }}>
                        <button className="action-btn secondary-btn" style={{ cursor: 'pointer' }} onClick={() => alert('Password updates simulated successfully!')}>Change Password</button>
                        <button className="action-btn secondary-btn" style={{ cursor: 'pointer' }} onClick={() => alert('Audit logs reset successfully!')}>Reset Logs</button>
                    </div>
                </div>

            </div>
        </AppShell>
    );
}
