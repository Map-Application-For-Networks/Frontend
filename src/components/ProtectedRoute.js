import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token

  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/login" />;
  }

  // Render children if token exists
  return children;
};

export default ProtectedRoute;
