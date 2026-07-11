import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LayoutDashboard, LogIn, LogOut, PlusSquare, UserPlus, Terminal } from 'lucide-react';

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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={24} />
          J_PORTAL.io
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/jobs">
          <Briefcase size={18} />
          <span>Explorer</span>
        </Link>
        {user ? (
          <>
            <Link to="/dashboard">
              <LayoutDashboard size={18} />
              <span>Console</span>
            </Link>
            {user.logintype === 'employer' && (
              <Link to="/post-job">
                <PlusSquare size={18} />
                <span>Broadcast</span>
              </Link>
            )}
            <button onClick={handleLogout} className="logout-btn" style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              textTransform: 'uppercase'
            }}>
              <LogOut size={18} />
              <span>Disconnect</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <LogIn size={18} />
              <span>Auth</span>
            </Link>
            <Link to="/register" className="btn-nav-register">
              <UserPlus size={18} />
              <span>Initialize</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

