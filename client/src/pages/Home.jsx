import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Find Your Dream Job Today</h1>
        <p>Connecting talented professionals with the world's leading companies.</p>
        <div className="hero-cta">
          <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
          <Link to="/register" className="btn-secondary">Post a Job</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>For Applicants</h3>
          <p>Search thousands of jobs and apply with a single click. Track your applications in real-time.</p>
        </div>
        <div className="feature-card">
          <h3>For Employers</h3>
          <p>Reach the best talent by posting your job openings. Manage candidates efficiently.</p>
        </div>
        <div className="feature-card">
          <h3>Secure & Fast</h3>
          <p>Your data is protected. Our platform is optimized for speed and ease of use.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
