/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}
