import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import { TeamLeadDashboard } from './pages/TeamLeadDashboard';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/dashboard/EmployeeDashboard',
        element: (
          // <ProtectedRoute>
          <EmployeeDashboard />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/TeamLeadDashboard',
        element: (
          <ProtectedRoute>
            <TeamLeadDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/admin',
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
