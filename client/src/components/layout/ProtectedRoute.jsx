import { useEffect } from 'react';
import { useLocation } from 'wouter';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [, setLocation] = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLocation('/login');
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      setLocation('/dashboard');
    }
  }, [token, user.role, requiredRole]);

  if (!token) return null;
  if (requiredRole && user.role !== requiredRole) return null;

  return children;
};

export default ProtectedRoute;