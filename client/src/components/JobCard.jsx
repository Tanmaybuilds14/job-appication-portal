import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className="salary">${job.salary.toLocaleString()}</span>
      </div>
      <p className="company">{job.company}</p>
      <p className="description">{job.description.substring(0, 150)}...</p>
      <div className="job-card-footer">
        <Link to={`/jobs/${job._id}`} className="view-details">View Details</Link>
      </div>
    </div>
  );
};

export default JobCard;
