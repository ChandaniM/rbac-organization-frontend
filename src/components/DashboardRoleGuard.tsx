import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

/**
 * DashboardRoleGuard - Protects dashboard routes based on user role.
 *
 * Access rules:
 * - SYSTEM_ADMIN: Allowed access
 * - org_admin: Allowed access
 * - Employee: Redirected to /org-directory
 * - Unauthenticated: Redirected to /auth/login
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4, 5.3, 5.4, 5.5, 5.6
 */
const DashboardRoleGuard = () => {
  const { isAuthenticated, isSystemAdmin, isOrgAdmin } = useAuth();

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  // Allow access for SYSTEM_ADMIN and org_admin roles
  if (isSystemAdmin || isOrgAdmin) {
    return <Outlet />;
  }

  // Redirect Employee (or any other role) to permitted page
  return <Navigate to='/org-directory' replace />;
};

export default DashboardRoleGuard;
