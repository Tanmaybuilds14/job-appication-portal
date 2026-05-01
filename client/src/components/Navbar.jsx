import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">JobPortal</Link>
      </div>
      <div className="nav-links">
        <Link to="/jobs">Browse Jobs</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {user.logintype === 'employer' && (
              <Link to="/post-job">Post a Job</Link>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
