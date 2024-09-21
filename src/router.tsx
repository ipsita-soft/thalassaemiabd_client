// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Home';
import { Register } from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import ClientLayout from './layouts/ClientLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute.tsx';
import Unauthorized from './pages/Unauthorized'; // Import the Unauthorized page
import Logout from './components/auth/Logout.tsx';
import { PaymentPage } from './pages/sidebar/webSetting/payment/PaymentPage';
import { SliderPage } from './pages/sidebar/webSetting/slider/SliderPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute 
      element={<DashboardLayout />} 
      requiredRoles={['admin']} 
    />,
    children: [
      {
        path: 'home',
        element: <ProtectedRoute 
          element={<HomePage />} 
          requiredPermissions={['view_users']} 
        />,
      },

      {
        path: 'payments',
        element: <ProtectedRoute 
          element={<PaymentPage />} 
          requiredPermissions={['view_users']} 
        />,
      },
      {
        path: 'slider',
        element: <ProtectedRoute 
          element={<SliderPage />} 
          requiredPermissions={['view_users']} 
        />,
      },

      {
        path: 'home2',
        element: <ProtectedRoute 
          element={<HomePage />} 
          requiredPermissions={['view_dashboard']} 
        />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <PublicRoute 
          element={<Login />} 
          redirectTo="/dashboard/home" 
        />,
      },
      {
        path: 'register',
        element: <PublicRoute 
          element={<Register />} 
          redirectTo="/dashboard/home" 
        />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
]);

export default router;
