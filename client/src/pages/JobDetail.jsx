import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Building2, DollarSign, FileText, Upload, Send, Loader2, ChevronLeft, AlertCircle, Check } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.data);
      } catch {
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
      setError('Please upload your resume');
      return;
    }

    setApplying(true);
    setError('');
    const formData = new FormData();
    formData.append('resume', file);

    try {
      await api.post(`/api/applications/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="loading" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Loader2 size={48} className="animate-spin" color="var(--primary)" />
    </div>
  );

  if (error && !job) return (
    <div className="page-container glass" style={{ textAlign: 'center', padding: '4rem' }}>
      <AlertCircle size={48} color="var(--error)" style={{ marginBottom: '1rem' }} />
      <p>{error}</p>
      <button onClick={() => navigate('/jobs')} className="btn-secondary" style={{ marginTop: '2rem' }}>Back to Jobs</button>
    </div>
  );

  if (!job) return <div className="page-container glass">Job not found</div>;

  return (
    <div className="page-container glass job-detail" style={{ maxWidth: '1100px' }}>
      <button 
        onClick={() => navigate('/jobs')} 
        style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2rem', transition: 'color 0.2s' }}
        onMouseOver={(e) => e.target.style.color = 'var(--text-white)'}
        onMouseOut={(e) => e.target.style.color = 'var(--text-dim)'}
      >
        <ChevronLeft size={20} /> Back to Listings
      </button>

      <div className="job-header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>{job.title}</h1>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}>
            <Building2 size={24} />
            <span style={{ fontSize: '1.4rem', fontWeight: '600' }}>{job.company}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success)' }}>
            <DollarSign size={24} />
            <span style={{ fontSize: '1.4rem', fontWeight: '600' }}>{job.salary.toLocaleString()} / year</span>
          </div>
        </div>
      </div>

      <div className="description-section" style={{ marginBottom: '4rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
          <FileText size={28} color="var(--primary)" /> Job Description
        </h3>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
          {job.description}
        </p>
      </div>

      {user?.logintype === 'applicant' && (
        <div className="apply-section glass" style={{ padding: '4rem', marginTop: '4rem', background: 'rgba(255,255,255,0.02)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ background: 'var(--success)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>
                <Check size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Application Sent!</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto' }}>
                Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been submitted successfully.
              </p>
              <button onClick={() => navigate('/jobs')} className="btn-secondary" style={{ marginTop: '3rem' }}>
                Browse More Jobs
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center' }}>Ready to Apply?</h3>
              {error && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', padding: '1rem', borderRadius: '0.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}
              <form onSubmit={handleApply} style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="file-upload-container" style={{ border: '2px dashed var(--glass-border)', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255,255,255,0.01)' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}>
                  <Upload size={48} color="var(--text-dim)" style={{ marginBottom: '1.5rem' }} />
                  <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
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
                  <label htmlFor="resume" className="btn-secondary" style={{ cursor: 'pointer' }}>
                    Browse Files
                  </label>
                </div>
                <button type="submit" disabled={applying} className="btn-primary" style={{ width: '100%', marginTop: '2.5rem', justifyContent: 'center', fontSize: '1.1rem', padding: '1.2rem' }}>
                  {applying ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                  {applying ? 'Submitting Application...' : 'Send Application'}
                </button>
              </form>
            </>
          )}
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
