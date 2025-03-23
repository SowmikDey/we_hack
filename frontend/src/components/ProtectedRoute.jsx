import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // TODO: Implement actual authentication check
  const isAuthenticated = false; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
} 