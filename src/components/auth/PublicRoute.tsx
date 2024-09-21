// src/components/auth/PublicRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element, redirectTo = '/' }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

export default PublicRoute;
