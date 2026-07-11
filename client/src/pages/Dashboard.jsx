import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Mail, Briefcase, Search, PlusSquare, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const isApplicant = user?.logintype === 'applicant';

  return (
    <div className="page-container" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0', padding: '4rem' }}>
      <div className="dashboard-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.75rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Console // Account Overview
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: '900', letterSpacing: '-0.05em' }}>
          Welcome, {user?.username || 'User'}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
          Auth Status: <span style={{ color: 'var(--accent)', textTransform: 'uppercase' }}>{user?.logintype}</span> // Logged_In
        </p>
      </div>

      <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '4rem' }}>
        <div className="info-card" style={{ padding: '2rem', background: 'var(--bg)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'var(--accent-glow)', padding: '12px', color: 'var(--accent)' }}>
            <Mail size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>Network_ID</span>
            <span style={{ fontWeight: '700', fontSize: '1rem' }}>{user?.email}</span>
          </div>
        </div>

        <div className="info-card" style={{ padding: '2rem', background: 'var(--bg)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'var(--accent-glow)', padding: '12px', color: 'var(--accent)' }}>
            <Shield size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>Permissions</span>
            <span style={{ fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}>{user?.logintype}</span>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>[ Quick_Operations ]</h2>
      <div className="dashboard-grid">
        {isApplicant ? (
          <>
            <Link to="/jobs" className="action-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0' }}>
              <div className="action-icon">
                <Search size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>Explorer</h3>
              <p style={{ color: 'var(--muted)' }}>Initialize job search across global technical nodes.</p>
            </Link>
            <Link to="/my-applications" className="action-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0' }}>
              <div className="action-icon">
                <FileText size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>Deployments</h3>
              <p style={{ color: 'var(--muted)' }}>Track status of active application packets.</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/post-job" className="action-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0' }}>
              <div className="action-icon">
                <PlusSquare size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>Broadcast</h3>
              <p style={{ color: 'var(--muted)' }}>Post new technical requirements to the network.</p>
            </Link>
            <div className="action-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0', opacity: 0.5, cursor: 'not-allowed' }}>
              <div className="action-icon" style={{ background: 'var(--surface)' }}>
                <Briefcase size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>Node_Manager</h3>
              <p style={{ color: 'var(--muted)' }}>Manage active listings (STAGED/BETA).</p>
            </div>
          </>
        )}
        <Link to="/profile" className="action-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0' }}>
          <div className="action-icon">
            <Settings size={32} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>Settings</h3>
          <p style={{ color: 'var(--muted)' }}>Update profile matrix and account preferences.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

