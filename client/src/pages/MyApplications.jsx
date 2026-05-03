import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Briefcase, Building2, Calendar, FileText, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/api/applications/me');
        setApplications(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch your applications. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return (
    <div className="loading" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Loader2 size={48} className="animate-spin" color="var(--primary)" />
    </div>
  );

  return (
    <div className="page-container glass">
      <div className="dashboard-header" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>My Applications</h1>
        <p style={{ color: 'var(--text-dim)' }}>Track the status of all your job applications in one place.</p>
      </div>

      {error && (
        <div className="glass error" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--error)', border: '1px solid var(--error)', marginBottom: '2rem' }}>
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      )}

      {!error && applications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }} className="glass">
          <Briefcase size={64} color="var(--text-dim)" style={{ marginBottom: '2rem', opacity: 0.3 }} />
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>No applications yet</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>You haven't applied to any jobs yet. Start your search now!</p>
          <a href="/jobs" className="btn-primary">Browse Jobs</a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {applications.map((app) => (
            <div key={app._id} className="glass" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary-glow)', padding: '1.25rem', borderRadius: '1rem', color: 'var(--primary)' }}>
                  <Briefcase size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{app.job?.title || 'Unknown Position'}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={16} /> {app.job?.company || 'Unknown Company'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} /> Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Status</span>
                  <span style={{ 
                    padding: '0.4rem 1rem', 
                    borderRadius: '2rem', 
                    fontSize: '0.85rem', 
                    fontWeight: '700', 
                    textTransform: 'capitalize',
                    background: app.status === 'accepted' ? 'rgba(16, 185, 129, 0.1)' : app.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                    color: app.status === 'accepted' ? 'var(--success)' : app.status === 'rejected' ? 'var(--error)' : 'var(--primary)',
                    border: `1px solid ${app.status === 'accepted' ? 'var(--success)' : app.status === 'rejected' ? 'var(--error)' : 'var(--primary)'}`
                  }}>
                    {app.status}
                  </span>
                </div>
                
                <a 
                  href={app.resume?.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-secondary" 
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                >
                  <FileText size={18} /> View Resume <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
