import { useEffect } from 'react';
import { useLocation } from 'wouter';
import SessionManager from '@/utils/sessionManager';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is logged in and token is not expired
    if (!SessionManager.isLoggedIn()) {
      SessionManager.clearSession();
      setLocation('/login');
      return;
    }

    // Check role if required
    if (requiredRole && !SessionManager.hasRole(requiredRole)) {
      setLocation('/dashboard');
    }
  }, [requiredRole]);

  // Don't render anything if not logged in or wrong role
  if (!SessionManager.isLoggedIn()) return null;
  if (requiredRole && !SessionManager.hasRole(requiredRole)) return null;

  return children;
};

export default ProtectedRoute; 