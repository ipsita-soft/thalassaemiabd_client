// src/components/auth/PublicRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface PublicRouteProps {
  element: JSX.Element;
  redirectTo?: string;
}

// Function to determine redirect path based on user roles
const getRedirectPath = (roles: string[]): string => {
  if (roles.includes('admin')) {
    return '/dashboard/home';
  } else if (roles.includes('blood_donor')) {
    return '/userpanel';
  }
  return '/unauthorized';
};

const PublicRoute: React.FC<PublicRouteProps> = ({ element, redirectTo }) => {
  const { token, roles } = useSelector((state: RootState) => state.auth);

  if (token) {
    // Set dynamic redirect path based on roles if `redirectTo` is not explicitly passed
    const dynamicRedirect = redirectTo || getRedirectPath(roles);
    return <Navigate to={dynamicRedirect} replace />;
  }

  // Render the element if not authenticated
  return element;
};

export default PublicRoute;
