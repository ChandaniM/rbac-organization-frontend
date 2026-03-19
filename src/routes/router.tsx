import { createBrowserRouter, redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardRoleGuard from '../components/DashboardRoleGuard';
import RouteErrorFallback from '../components/RouteErrorFallback';
import Dashboard from '../pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/auth/login"),
  },
  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <DashboardRoleGuard />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
      {
        path: '/org-directory',
        lazy: async () => {
          const UserManagement = (await import('../pages/UserManagement'))
            .default;
          return { Component: UserManagement };
        },
      },
      {
        path: '/org-tree',
        lazy: async () => {
          const OrganizationTree = (await import('../pages/OrganizationTree'))
            .default;
          return { Component: OrganizationTree };
        },
      },
      {
        path: '/job-portal',
        lazy: async () => {
          const JobPortal = (await import('../pages/JobPortal')).default;
          return { Component: JobPortal };
        },
      },
      {
        path: '/setting',
        lazy: async () => {
          const setting = (await import('../pages/setting')).default;
          return { Component: setting };
        },
      },
    ],
  },
  {
    path: '/auth/:type',
    lazy: async () => {
      const AuthPage = (await import('../pages/auth')).default;
      return { Component: AuthPage };
    },
  },
]);

export default router;
