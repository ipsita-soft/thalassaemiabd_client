// src/components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import API from '../../api'; // Adjust the import based on your API setup

const ProtectedRoute = ({ element, requiredRoles = [], requiredPermissions = [], redirectTo = '/' }) => {
  const { token, roles, permissions } = useSelector((state) => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(null); // null: loading, true: authorized, false: unauthorized

  useEffect(() => {
    const validateUserRolesAndPermissions = async () => {
      try {
        if (!token) {
          setIsAuthorized(false);
          return;
        }
        // Optionally verify token validity or user roles from server
        // const response = await API.get('/user/validate', {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const { valid } = response.data;

        if (valid) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    validateUserRolesAndPermissions();
  }, [token]);

  if (isAuthorized === null) return null; 

  if (!token) return <Navigate to="/login" />;

  const hasRequiredRole = requiredRoles.length ? requiredRoles.some(role => roles.includes(role)) : true;
  const hasRequiredPermission = requiredPermissions.length ? requiredPermissions.some(perm => permissions.includes(perm)) : true;

  if (!hasRequiredRole || !hasRequiredPermission) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
