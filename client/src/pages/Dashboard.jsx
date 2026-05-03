import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Mail, Briefcase, Search, PlusSquare, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const isApplicant = user?.logintype === 'applicant';

  return (
    <div className="page-container glass">
      <div className="dashboard-header" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: '800' }}>
          Welcome, {user?.username || 'User'}
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>
          You are logged in as an <strong style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{user?.logintype}</strong>
        </p>
      </div>

      <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <div className="info-card glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '10px' }}>
            <Mail size={20} color="var(--primary)" />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)' }}>Email</span>
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{user?.email}</span>
          </div>
        </div>

        <div className="info-card glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(192, 132, 252, 0.2)', padding: '10px', borderRadius: '10px' }}>
            <Shield size={20} color="#c084fc" />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)' }}>Role</span>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', textTransform: 'capitalize' }}>{user?.logintype}</span>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Quick Actions</h2>
      <div className="dashboard-grid">
        {isApplicant ? (
          <>
            <Link to="/jobs" className="action-card glass">
              <div className="action-icon">
                <Search size={32} />
              </div>
              <h3>Browse Jobs</h3>
              <p style={{ color: 'var(--text-dim)' }}>Explore thousands of job opportunities and find your next career move.</p>
            </Link>
            <Link to="/my-applications" className="action-card glass">
              <div className="action-icon">
                <FileText size={32} />
              </div>
              <h3>My Applications</h3>
              <p style={{ color: 'var(--text-dim)' }}>Track the status of your submitted applications and view your history.</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/post-job" className="action-card glass">
              <div className="action-icon">
                <PlusSquare size={32} />
              </div>
              <h3>Post a Job</h3>
              <p style={{ color: 'var(--text-dim)' }}>Create a new job opening and find the best talent for your company.</p>
            </Link>
            <div className="action-card glass" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
              <div className="action-icon" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <Briefcase size={32} />
              </div>
              <h3>Manage Listings</h3>
              <p style={{ color: 'var(--text-dim)' }}>View and edit your active job postings and applicants (Coming Soon).</p>
            </div>
          </>
        )}
        <Link to="/profile" className="action-card glass">
          <div className="action-icon">
            <Settings size={32} />
          </div>
          <h3>Account Settings</h3>
          <p style={{ color: 'var(--text-dim)' }}>Update your profile information, skills, education, and account preferences.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
