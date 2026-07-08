'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/utils/auth';
import { ApiService } from '@/utils/api';

export default function AppShell({ children, title }) {
    const router = useRouter();
    const pathname = usePathname();
    
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [theme, setTheme] = useState('dark-theme'); // default theme
    const [loading, setLoading] = useState(true);

    // 1. Initial Authentication Check & Theme Loading
    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            router.push('/login');
            return;
        }

        // Get cached user session
        setUser(AuthService.getUser());

        // Load theme preferences
        const savedTheme = localStorage.getItem('resumex_theme') || 'dark-theme';
        setTheme(savedTheme);
        document.body.className = savedTheme;

        // Fetch server profile details
        loadProfileData();
    }, [router]);

    const loadProfileData = async () => {
        try {
            const data = await ApiService.fetchProfile();
            setStats(data);
            
            // Sync user local cache if backend status changed
            const cachedUser = AuthService.getUser();
            if (cachedUser && cachedUser.is_premium !== data.is_premium) {
                cachedUser.is_premium = data.is_premium;
                cachedUser.premium_expiry = data.premium_expiry;
                AuthService.saveSession(AuthService.getToken(), cachedUser);
                setUser(cachedUser);
            }
        } catch (err) {
            console.error("Failed to load user profile metrics:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. Theme Toggle Action
    const toggleTheme = () => {
        const nextTheme = theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
        setTheme(nextTheme);
        document.body.className = nextTheme;
        localStorage.setItem('resumex_theme', nextTheme);
    };

    // 3. Logout Action
    const handleLogout = () => {
        AuthService.logout(router);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)'
            }}>
                <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', marginBottom: '15px', color: 'var(--primary-glow)' }}></i>
                <h3 style={{ fontFamily: 'var(--font-heading)' }}>Loading your dashboard...</h3>
            </div>
        );
    }

    const initials = user?.name ? 
        user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 
        'U';

    return (
        <div className="app-shell">
            {/* Sidebar Navigation */}
            <aside className="app-sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div className="logo-text">
                        <h2>Resume<span>X</span></h2>
                    </div>
                </div>
                
                <ul className="sidebar-menu">
                    <li className={`menu-item ${pathname === '/dashboard' ? 'active' : ''}`}>
                        <Link href="/dashboard"><i className="fa-solid fa-table-columns"></i> Dashboard</Link>
                    </li>
                    <li className={`menu-item ${pathname === '/history' ? 'active' : ''}`}>
                        <Link href="/history"><i className="fa-solid fa-clock-rotate-left"></i> History Log</Link>
                    </li>
                    <li className={`menu-item ${pathname === '/profile' ? 'active' : ''}`}>
                        <Link href="/profile"><i className="fa-solid fa-user-tie"></i> Profile Stats</Link>
                    </li>
                </ul>
                
                {/* Subscription Info Card in Sidebar */}
                {stats && (
                    <div className="sidebar-card" id="sidebar-sub-card" style={{ margin: '20px 18px', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <i className="fa-solid fa-crown" style={{ color: stats.is_premium ? 'var(--warning-accent)' : 'var(--text-muted)' }} id="sub-crown-icon"></i>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: stats.is_premium ? 'var(--warning-accent)' : 'var(--text-primary)' }} id="sub-plan-title">
                                {stats.is_premium ? "Premium Plan" : "Free Plan"}
                            </h4>
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            <div id="sub-usage-text">
                                {stats.is_premium ? `Analyses today: ${stats.analyses_today || 0} / 50` : `Usage: ${stats.total_analyzed || 0} / 3 total`}
                            </div>
                            <div id="sub-remaining-text">
                                {stats.is_premium ? `Remaining today: ${stats.remaining_today ?? 50}` : `Remaining: ${stats.remaining_today ?? 3} left`}
                            </div>
                            {stats.is_premium && stats.premium_expiry && (
                                <div id="sub-expiry-row" style={{ marginTop: '4px' }}>
                                    Expires: <span id="sub-expiry-date">{new Date(stats.premium_expiry).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            )}
                        </div>
                        {!stats.is_premium && (
                            <Link href="/subscription" className="action-btn primary-btn" id="btn-sidebar-upgrade" style={{ width: '100%', height: '32px', fontSize: '0.72rem', marginTop: '12px', padding: 0, display: 'flex', textDecoration: 'none' }}>
                                Upgrade to Premium
                            </Link>
                        )}
                    </div>
                )}
                
                <div className="sidebar-footer">
                    <div className="user-badge">
                        <div className="user-avatar" id="nav-user-avatar">{initials}</div>
                        <div className="user-info">
                            <div className="user-name" id="nav-user-name">{user?.name || 'Candidate'}</div>
                            <div className="user-email" id="nav-user-email">{user?.email || ''}</div>
                        </div>
                    </div>
                    <button className="action-btn secondary-btn" id="btn-logout" onClick={handleLogout} style={{ width: '100%', height: '38px' }}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Shell */}
            <div className="app-content">
                {/* Navbar Header */}
                <header className="app-navbar">
                    <div className="navbar-title">
                        <h1>{title}</h1>
                    </div>
                    <div className="navbar-controls">
                        <div id="navbar-sub-badge" style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                            {stats?.is_premium ? (
                                <span className="badge-tag gold" style={{ fontSize: '0.72rem', padding: '6px 12px', fontWeight: 700, borderRadius: '6px', display: 'inline-flex', alignItems: 'center', cursor: 'default' }}>
                                    <i className="fa-solid fa-crown" style={{ marginRight: '4px' }}></i> Premium
                                </span>
                            ) : (
                                <Link href="/subscription" className="badge-tag match" style={{ fontSize: '0.72rem', padding: '6px 12px', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: 'var(--primary-glow)', borderColor: 'var(--primary-glow)', background: 'rgba(79, 70, 229, 0.08)' }}>
                                    <i className="fa-solid fa-arrow-up" style={{ marginRight: '4px' }}></i> Upgrade
                                </Link>
                            )}
                        </div>
                        <button className="control-btn" id="theme-toggle-btn" title="Toggle Theme" onClick={toggleTheme}>
                            <i className={theme === 'dark-theme' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
                        </button>
                    </div>
                </header>

                {/* Scrollable Workspace Viewport */}
                <main className="main-view-container">
                    {children}
                </main>
            </div>
        </div>
    );
}
