import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Briefcase, Building2, DollarSign, FileText, PlusCircle, Loader2 } from 'lucide-react';

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
    <div className="auth-container glass" style={{ maxWidth: '700px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <PlusCircle size={28} color="var(--primary)" /> Post a New Opening
      </h2>
      {error && <p className="error glass" style={{ marginBottom: '2rem' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group" style={{ position: 'relative' }}>
          <Briefcase size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="text" 
            name="title" 
            placeholder="Job Title (e.g. Senior Frontend Developer)" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <Building2 size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="text" 
            name="company" 
            placeholder="Company Name" 
            value={formData.company} 
            onChange={handleChange} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <DollarSign size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="number" 
            name="salary" 
            placeholder="Annual Salary (in USD)" 
            value={formData.salary} 
            onChange={handleChange} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <FileText size={20} style={{ position: 'absolute', left: '12px', top: '25px', color: 'var(--text-dim)' }} />
          <textarea 
            name="description" 
            placeholder="Detailed Job Description & Requirements..." 
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows="8"
            style={{ paddingLeft: '45px', width: '100%', paddingTop: '15px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '1rem' }}>
          {loading ? <Loader2 size={20} className="animate-spin" /> : <PlusCircle size={20} />}
          {loading ? 'Posting Opening...' : 'Publish Job Opening'}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
