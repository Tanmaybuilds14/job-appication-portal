import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data.data);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>
      <div className="jobs-grid">
        {jobs.length > 0 ? (
          jobs.map(job => <JobCard key={job._id} job={job} />)
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
