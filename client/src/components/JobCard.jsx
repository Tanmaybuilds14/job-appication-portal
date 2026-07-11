import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, DollarSign, MapPin, ExternalLink } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card glass">
      <div className="job-card-header">
        <div>
          <h3>{job.title}</h3>
          <div className="company-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', marginTop: '4px' }}>
            <Building2 size={16} />
            <span>{job.company}</span>
          </div>
        </div>
        <div className="salary-info" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)', fontWeight: '700' }}>
          <DollarSign size={18} />
          <span>{job.salary.toLocaleString()}</span>
        </div>
      </div>
      <p className="description" style={{ margin: '1rem 0', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        {job.description.substring(0, 120)}...
      </p>
      <div className="job-card-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={`/jobs/${job._id}`} className="view-details" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
          View Details <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
