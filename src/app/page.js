import Link from 'next/link';

export const metadata = {
  title: "ResumeX | Full-Stack ATS Resume Analytics",
  description: "Optimize resume keywords and match scoring using in-browser AI sentence embeddings.",
};

export default function LandingPage() {
  return (
    <div className="light-theme" style={{ overflowY: 'auto', height: 'auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Landing Navigation */}
      <header className="landing-navbar">
        <div className="sidebar-logo" style={{ borderBottom: 'none', padding: 0 }}>
          <div className="logo-icon">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div className="logo-text">
            <h2>Resume<span>X</span></h2>
          </div>
        </div>
        <div className="navbar-controls">
          <Link href="/login" className="action-btn secondary-btn" style={{ height: '38px' }}>Sign In</Link>
          <Link href="/login?tab=register" className="action-btn primary-btn" style={{ height: '38px' }}>Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 24px' }}>
        <h1 className="staggered-fade-1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '3rem', lineHeight: 1.2 }}>
          Crush the Applicant Tracking System with <br />
          <span className="accent-text" style={{ background: 'linear-gradient(135deg, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>
            AI Resume Optimization
          </span>
        </h1>
        <p className="staggered-fade-2" style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '650px', marginTop: '10px' }}>
          Upload your resume, paste your target job description, and leverage advanced sentence embeddings to optimize your ATS score, fill keyword gaps, and generate tailored cover letters instantly.
        </p>
        <div className="staggered-fade-3" style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
          <Link href="/login" className="action-btn primary-btn">
            <i className="fa-solid fa-rocket"></i> Analyze Resume Now
          </Link>
          <Link href="/login" className="action-btn secondary-btn">
            <i className="fa-solid fa-circle-play"></i> Watch Demo
          </Link>
        </div>
      </section>

      {/* SaaS Features Grid */}
      <section style={{ maxWidth: '1200px', margin: '-40px auto 80px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
        <div className="card" style={{ marginBottom: 0 }}>
          <i className="fa-solid fa-magnifying-glass-chart" style={{ fontSize: '2rem', color: 'var(--secondary-accent)', marginBottom: '15px', display: 'block' }}></i>
          <h3>ATS Cosine Similarity Scorer</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Calculates standard cosine similarities using advanced sentence embeddings to ensure optimal context match against job description criteria.
          </p>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '2rem', color: 'var(--primary-glow)', marginBottom: '15px', display: 'block' }}></i>
          <h3>Generative AI Cover Letter</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Automatically compiles a customized, professional cover letter matching your experience overlaps directly to the job description constraints.
          </p>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <i className="fa-solid fa-circle-check" style={{ fontSize: '2rem', color: 'var(--success-accent)', marginBottom: '15px', display: 'block' }}></i>
          <h3>Automated Structure Checklist</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Checks document sections, metadata layouts, contact coordinates, and word densities to verify perfect layout alignment.
          </p>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-muted)', backgroundColor: 'var(--sidebar-bg)', marginTop: 'auto' }}>
        <p>© 2026 ResumeX. Developed using FastAPI, PostgreSQL, and Next.js. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
