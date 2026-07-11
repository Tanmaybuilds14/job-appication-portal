import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Find Your Dream Job Today</h1>
        <p>Connecting talented professionals with the world's leading companies through a seamless, modern platform.</p>
        <div className="hero-cta">
          <Link to="/jobs" className="btn-primary">
            Browse Jobs <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </Link>
          <Link to="/register" className="btn-secondary">Post a Job</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card glass">
          <div className="feature-icon">
            <Users size={32} color="#818cf8" />
          </div>
          <h3>For Applicants</h3>
          <p>Search thousands of jobs and apply with a single click. Track your applications in real-time with our intuitive dashboard.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">
            <Briefcase size={32} color="#c084fc" />
          </div>
          <h3>For Employers</h3>
          <p>Reach the best talent by posting your job openings. Manage candidates efficiently with our advanced screening tools.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">
            <ShieldCheck size={32} color="#10b981" />
          </div>
          <h3>Secure & Fast</h3>
          <p>Your data is protected with enterprise-grade security. Our platform is optimized for speed and a hassle-free experience.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
