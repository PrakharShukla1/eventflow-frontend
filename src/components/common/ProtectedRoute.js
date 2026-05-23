// ============================================================
// components/common/ProtectedRoute.js
// Redirects unauthenticated users to login
// Redirects non-admins away from admin routes
// ============================================================

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Show nothing while checking auth state (prevents flash)
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Trying to access admin page as a regular user
  if (adminOnly && user.role !== 'admin') return <Navigate to="/events" replace />;

  return children;
};

export default ProtectedRoute;
