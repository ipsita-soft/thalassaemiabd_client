// src/components/auth/PublicRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {RootState} from '@/redux/store'

interface PublicRouteProps {
  element: JSX.Element;
  redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, redirectTo = '/' }) => {
  const { token } = useSelector((state:RootState) => state.auth);

  if (token) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

export default PublicRoute;
