import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, Briefcase, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logintype, setLogintype] = useState('applicant');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password, logintype);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container glass">
      <h2>Welcome Back</h2>
      
      <div className="role-selector">
        <button 
          className={`role-btn ${logintype === 'applicant' ? 'active' : ''}`}
          onClick={() => setLogintype('applicant')}
        >
          <User size={24} />
          <span>Applicant</span>
        </button>
        <button 
          className={`role-btn ${logintype === 'employer' ? 'active' : ''}`}
          onClick={() => setLogintype('employer')}
        >
          <Briefcase size={24} />
          <span>Employer</span>
        </button>
      </div>

      {error && (
        <div className="error glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--error)', border: '1px solid var(--error)', padding: '0.8rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group" style={{ position: 'relative' }}>
          <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <LogIn size={20} />
          <span>Login as {logintype.charAt(0).toUpperCase() + logintype.slice(1)}</span>
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
