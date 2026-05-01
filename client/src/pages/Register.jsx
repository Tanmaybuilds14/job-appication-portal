import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle, Briefcase, UserCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    logintype: 'applicant'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container glass">
      <h2>Create Account</h2>
      {error && (
        <div className="error" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group" style={{ position: 'relative' }}>
          <User size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="text" 
            name="username" 
            placeholder="Full Name" 
            value={formData.username} 
            onChange={handleChange} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{ paddingLeft: '45px', width: '100%' }}
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <UserCheck size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <select 
            name="logintype" 
            value={formData.logintype} 
            onChange={handleChange}
            style={{ paddingLeft: '45px', width: '100%', appearance: 'none' }}
          >
            <option value="applicant">Register as Applicant</option>
            <option value="employer">Register as Employer</option>
          </select>
        </div>
        <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <UserPlus size={20} />
          <span>Create Account</span>
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;
