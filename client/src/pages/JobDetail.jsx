import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Building2, DollarSign, FileText, Upload, Send, Loader2, ChevronLeft, AlertCircle } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.data);
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!file) {
      alert('Please upload your resume');
      return;
    }

    setApplying(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      await api.post(`/api/applications/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="loading" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Loader2 size={48} className="animate-spin" color="var(--primary)" />
    </div>
  );

  if (error) return (
    <div className="page-container glass" style={{ textAlign: 'center', padding: '4rem' }}>
      <AlertCircle size={48} color="var(--error)" style={{ marginBottom: '1rem' }} />
      <p>{error}</p>
      <button onClick={() => navigate('/jobs')} className="btn-secondary" style={{ marginTop: '2rem' }}>Back to Jobs</button>
    </div>
  );

  if (!job) return <div className="page-container glass">Job not found</div>;

  return (
    <div className="page-container glass job-detail" style={{ maxWidth: '900px' }}>
      <button 
        onClick={() => navigate('/jobs')} 
        style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2rem', transition: 'color 0.2s' }}
        onMouseOver={(e) => e.target.style.color = 'var(--text-white)'}
        onMouseOut={(e) => e.target.style.color = 'var(--text-dim)'}
      >
        <ChevronLeft size={20} /> Back to Listings
      </button>

      <div className="job-header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{job.title}</h1>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
            <Building2 size={20} />
            <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{job.company}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
            <DollarSign size={20} />
            <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{job.salary.toLocaleString()} / year</span>
          </div>
        </div>
      </div>

      <div className="description-section" style={{ marginBottom: '4rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          <FileText size={24} color="var(--primary)" /> Job Description
        </h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
          {job.description}
        </p>
      </div>

      {user?.logintype === 'applicant' && (
        <div className="apply-section glass" style={{ padding: '3rem', marginTop: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Ready to Apply?</h3>
          <form onSubmit={handleApply} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="file-upload-container" style={{ border: '2px dashed var(--glass-border)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}>
              <Upload size={32} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                {file ? `Selected: ${file.name}` : 'Upload your resume (PDF/DOC)'}
              </p>
              <input 
                type="file" 
                id="resume" 
                onChange={(e) => setFile(e.target.files[0])} 
                accept=".pdf,.doc,.docx" 
                required 
                style={{ opacity: 0, position: 'absolute', width: '1px', height: '1px' }}
              />
              <label htmlFor="resume" style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: '600' }}>
                Browse Files
              </label>
            </div>
            <button type="submit" disabled={applying} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', marginTop: '2rem' }}>
              {applying ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              {applying ? 'Submitting...' : 'Send Application'}
            </button>
          </form>
        </div>
      )}

      {!user && (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button className="btn-primary" onClick={() => navigate('/login')} style={{ padding: '1rem 3rem' }}>
            Login to Apply for this Job
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
