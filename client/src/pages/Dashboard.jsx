import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Calendar, Mail } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container glass">
      <div className="dashboard-header" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>User Dashboard</h1>
        <p style={{ color: 'var(--text-dim)' }}>Manage your profile and track your activity.</p>
      </div>

      <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div className="info-card glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '12px', borderRadius: '12px' }}>
            <User size={24} color="white" />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)' }}>Username</span>
            <span style={{ fontWeight: '600' }}>{user?.username}</span>
          </div>
        </div>

        <div className="info-card glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Mail size={24} color="#10b981" />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)' }}>Email Address</span>
            <span style={{ fontWeight: '600' }}>{user?.email}</span>
          </div>
        </div>

        <div className="info-card glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(192, 132, 252, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Shield size={24} color="#c084fc" />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)' }}>Account Type</span>
            <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{user?.logintype}</span>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--glass-border)' }}>
        <p style={{ color: 'var(--text-dim)' }}>More dashboard features coming soon!</p>
      </div>
    </div>
  );
};

export default Dashboard;
