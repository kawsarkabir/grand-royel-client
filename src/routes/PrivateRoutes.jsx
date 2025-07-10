import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/signin" state={location.pathname} />;
  }
  return children;
}
