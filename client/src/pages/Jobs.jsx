import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import JobCard from '../components/JobCard';
import { Search, Loader2, Cpu } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data.data);
      } catch {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="loading" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', fontFamily: 'var(--font-mono)' }}>
      <Loader2 size={48} className="animate-spin" style={{ color: 'var(--accent)' }} />
      <p style={{ letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Scanning_Nodes...</p>
    </div>
  );

  return (
    <div className="jobs-page" style={{ position: 'relative' }}>
       {/* Motion Background */}
       <div className="motion-container" style={{ position: 'fixed' }}>
        <div className="grid-lines"></div>
      </div>

      <div className="jobs-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.75rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Network // Node_Explorer
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '900', letterSpacing: '-0.05em' }}>GLOBAL DEPLOYMENTS</h1>
        <div className="search-bar" style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0.25rem 1.5rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '0'
        }}>
          <Search size={20} style={{ color: 'var(--muted)' }} />
          <input 
            type="text" 
            placeholder="Search by title, company, or stack..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', width: '100%', padding: '1rem', color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {error && <div className="error" style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--border)', color: 'var(--accent)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>[ Error ] {error}</div>}

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job._id} job={job} />)
        ) : (
          <div style={{ 
            gridColumn: '1 / -1', 
            padding: '6rem', 
            textAlign: 'center', 
            border: '1px dashed var(--border)',
            background: 'var(--surface)',
            fontFamily: 'var(--font-mono)'
          }}>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', textTransform: 'uppercase' }}>0 Nodes Found Matching Search_Query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;

