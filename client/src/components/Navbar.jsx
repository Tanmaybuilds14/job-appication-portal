import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LayoutDashboard, LogIn, LogOut, PlusSquare, UserPlus } from 'lucide-react';

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
        <Link to="/jobs">
          <Briefcase size={20} />
          <span>Browse Jobs</span>
        </Link>
        {user ? (
          <>
            <Link to="/dashboard">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            {user.logintype === 'employer' && (
              <Link to="/post-job">
                <PlusSquare size={20} />
                <span>Post a Job</span>
              </Link>
            )}
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <LogIn size={20} />
              <span>Login</span>
            </Link>
            <Link to="/register" className="btn-nav-register">
              <UserPlus size={20} />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
