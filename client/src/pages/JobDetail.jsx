import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

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

  if (loading) return <div className="loading">Loading job details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="page-container job-detail">
      <h1>{job.title}</h1>
      <p className="company">{job.company}</p>
      <p className="salary">Salary: ${job.salary.toLocaleString()}</p>
      <div className="description">
        <h3>Description</h3>
        <p>{job.description}</p>
      </div>

      {user?.logintype === 'applicant' && (
        <div className="apply-section">
          <h3>Apply for this position</h3>
          <form onSubmit={handleApply}>
            <div className="file-input">
              <label htmlFor="resume">Upload Resume (PDF/Doc)</label>
              <input 
                type="file" 
                id="resume" 
                onChange={(e) => setFile(e.target.files[0])} 
                accept=".pdf,.doc,.docx" 
                required 
              />
            </div>
            <button type="submit" disabled={applying}>
              {applying ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      )}

      {!user && (
        <button className="login-to-apply" onClick={() => navigate('/login')}>
          Login to Apply
        </button>
      )}
    </div>
  );
};

export default JobDetail;
