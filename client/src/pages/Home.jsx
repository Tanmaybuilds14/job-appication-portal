import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code, Cpu, Globe, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">
      {/* Motion Background */}
      <div className="motion-container">
        <div className="grid-lines"></div>
      </div>

      <section className="hero">
        <div className="kicker" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.2rem',
          marginBottom: '2rem'
        }}>
          Next-Gen Career OS // v1.0.4
        </div>
        <h1>BUILD YOUR<br/>FUTURE IN PRO.</h1>
        <p>The technical job marketplace for the GenZ builder cohort. Stop applying, start deploying your career into high-growth teams.</p>
        <div className="hero-cta">
          <Link to="/jobs" className="btn-primary">
            Initialize Search <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </Link>
          <Link to="/register" className="btn-secondary">Post Listing</Link>
        </div>
      </section>

      {/* Terminal Feature Demo */}
      <section className="terminal-card">
        <div className="terminal-header">
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }}></div>
          <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>jportal — search</span>
        </div>
        <div className="terminal-body">
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--accent)', marginRight: '10px' }}>$</span>
            <span style={{ color: 'var(--fg)' }}>jportal query --skills="react, typescript" --remote</span>
          </div>
          <div style={{ paddingLeft: '20px', borderLeft: '1px solid var(--border)', marginBottom: '1.5rem' }}>
            <span style={{ display: 'block' }}>[info] Searching global node network...</span>
            <span style={{ display: 'block', color: 'var(--accent)' }}>[success] Found 42 matching deployments.</span>
            <span style={{ display: 'block' }}>[output] Next: Frontend Engineer @ Vercel (Staged)</span>
          </div>
          <div>
            <span style={{ color: 'var(--accent)', marginRight: '10px' }}>$</span>
            <span style={{ color: 'var(--fg)' }}>jportal apply --id="VRC-2024" --autodeploy</span>
          </div>
          <div style={{ paddingLeft: '20px', borderLeft: '1px solid var(--border)' }}>
            <span style={{ display: 'block' }}>[pending] Verifying technical credentials...</span>
            <span style={{ display: 'block', color: 'var(--accent)' }}>[success] Application delivered to maintainer.</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0' }}>
          <div className="feature-icon" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
            <Code size={32} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', marginBottom: '1rem' }}>Technical First</h3>
          <p>Verified skill matrices and portfolio deployments. No fluff, just the stack you built.</p>
        </div>
        <div className="feature-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0' }}>
          <div className="feature-icon" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
            <Cpu size={32} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', marginBottom: '1rem' }}>Automated Ops</h3>
          <p>Track applications with git-like precision. Status updates delivered in real-time to your console.</p>
        </div>
        <div className="feature-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0' }}>
          <div className="feature-icon" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
            <Globe size={32} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', marginBottom: '1rem' }}>Global Nodes</h3>
          <p>Connect with high-growth teams across the decentralized workforce. Remote-first by default.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

