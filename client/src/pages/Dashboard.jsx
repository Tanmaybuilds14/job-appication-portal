import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.username}!</p>
      <p>Role: {user?.logintype}</p>
    </div>
  );
};

export default Dashboard;
