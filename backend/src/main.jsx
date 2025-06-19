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
import Admin from './pages/Admin'

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
        path: '/dashboard/EmployeeDashboard', // ✅ corrected spelling
        element: <EmployeeDashboard />
      },
      {
        path: '/dashboard/TeamLeadDashboard', // ✅ also fix this one
        element: <TeamLeadDashboard />
      },
      {
        path: '/dashboard/admin',
        element: <Admin />
      }
      // add other nested routes here
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
