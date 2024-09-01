import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BackNavigationPreventer = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const handlePopState = (event) => {
        event.preventDefault();
        if (location.pathname === '/login' || location.pathname === '/') {
          navigate('/projects');
        }
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isAuthenticated, location, navigate]);

  return null;
};

export default BackNavigationPreventer;
