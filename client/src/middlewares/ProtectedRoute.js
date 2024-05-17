import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');
  const token = document.cookie.includes('token');

  if (role && token) {
    // If both role and token exist, redirect to the appropriate dashboard based on the role
    switch (role) {
      case 'admin':
        if (location.pathname.startsWith('/user/admin')) {
        return <Navigate to="/user/admin/dashboard" replace />;
      }
      break;
      case 'registrar':
        if (location.pathname.startsWith('/user/registrar')) {
        return <Navigate to="/user/registrar/dashboard" replace />;
      }
      break;
      case 'teacher':
        if (location.pathname.startsWith('/user/teacher')) {
        return <Navigate to="/user/teacher/dashboard" replace />;
      }
      break;
      default:
        break;
    }
  } else if (!role) {
    // If there is no role, redirect to the login page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If role exists but token does not, allow access to protected routes
  return <Outlet />;
};

export default ProtectedRoute;
