import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, DollarSign, MapPin, ExternalLink, Cpu } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card" style={{ 
      background: 'var(--surface)', 
      border: '1px solid var(--border)', 
      borderRadius: '0', 
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'all 0.2s ease'
    }}>
      <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={12} /> ID_{job._id.substring(job._id.length - 6).toUpperCase()}
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: '1.2' }}>{job.title}</h3>
          <div className="company-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '0.9rem' }}>
            <Building2 size={16} />
            <span style={{ fontFamily: 'var(--font-mono)' }}>{job.company}</span>
          </div>
        </div>
        <div className="salary-info" style={{ 
          background: 'var(--accent-glow)', 
          padding: '6px 12px', 
          border: '1px solid var(--accent)', 
          color: 'var(--accent)', 
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          fontWeight: '700'
        }}>
          ${job.salary.toLocaleString()}
        </div>
      </div>
      
      <p className="description" style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: '0.5rem 0' }}>
        {job.description.substring(0, 100)}...
      </p>

      <div className="job-card-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '10px', background: 'var(--surface-elevated)', padding: '4px 8px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>FULL_TIME</span>
          <span style={{ fontSize: '10px', background: 'var(--surface-elevated)', padding: '4px 8px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>REMOTE</span>
        </div>
        <Link to={`/jobs/${job._id}`} className="view-details" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--fg)', 
          textDecoration: 'none', 
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: '700'
        }}>
          Initialize <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;

