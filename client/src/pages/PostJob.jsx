import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    salary: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/jobs/create', formData);
      alert('Job posted successfully!');
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: '600px' }}>
      <h2>Post a New Job</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          placeholder="Job Title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="company" 
          placeholder="Company Name" 
          value={formData.company} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="salary" 
          placeholder="Salary" 
          value={formData.salary} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="description" 
          placeholder="Job Description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          rows="5"
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
