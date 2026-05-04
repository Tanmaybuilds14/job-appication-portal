import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import JobCard from '../components/JobCard';
import { Search, Loader2 } from 'lucide-react';

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
    <div className="loading" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
      <Loader2 size={48} className="animate-spin" color="var(--primary)" />
      <p>Fetching amazing opportunities...</p>
    </div>
  );

  return (
    <div className="jobs-page">
      <div className="jobs-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Explore Opportunities</h1>
        <div className="search-bar glass" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', padding: '0.5rem 1.5rem' }}>
          <Search size={20} color="var(--text-dim)" />
          <input 
            type="text" 
            placeholder="Search by job title or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', width: '100%', padding: '1rem' }}
          />
        </div>
      </div>

      {error && <div className="error glass" style={{ marginBottom: '2rem' }}>{error}</div>}

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job._id} job={job} />)
        ) : (
          <div className="glass" style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>No jobs matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
