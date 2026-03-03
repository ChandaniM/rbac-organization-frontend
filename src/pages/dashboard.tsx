import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Alert, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Layout from '../layouts/Layout';
import { useAuth } from '../store/AuthContext';
import {
  getMetrics,
  type SystemAdminMetricsResponse,
  type OrgAdminMetricsResponse,
} from '../services/dashboard.service';
import MetricCard from '../components/MetricCard';

type DashboardMetrics = SystemAdminMetricsResponse | OrgAdminMetricsResponse;

/**
 * Type guard to check if metrics are for SYSTEM_ADMIN
 */
const isSystemAdminMetrics = (
  metrics: DashboardMetrics,
): metrics is SystemAdminMetricsResponse => {
  return 'metrics' in metrics && 'totalTenants' in metrics.metrics;
};

/**
 * Type guard to check if metrics are for org_admin
 */
const isOrgAdminMetrics = (
  metrics: DashboardMetrics,
): metrics is OrgAdminMetricsResponse => {
  return 'metrics' in metrics && 'totalUsers' in metrics.metrics;
};

/**
 * Dashboard page component that displays role-based metrics.
 * - SYSTEM_ADMIN: Views platform-wide tenant statistics
 * - org_admin: Views organization-scoped user statistics
 *
 * Validates: Requirements 5.7, 6.4, 6.5, 6.6
 */
const Dashboard = () => {
  const { isSystemAdmin, isOrgAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMetrics();
        setMetrics(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            'An unexpected error occurred while fetching dashboard data',
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  /**
   * Renders the appropriate dashboard title based on user role
   */
  const getDashboardTitle = () => {
    if (isSystemAdmin) {
      return 'System Admin Dashboard';
    }
    if (isOrgAdmin) {
      return 'Organization Dashboard';
    }
    return 'Dashboard';
  };

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant='h4' fontWeight='700'>
          {getDashboardTitle()}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
          {isSystemAdmin && 'Platform-wide statistics and metrics'}
          {isOrgAdmin && 'Your organization statistics and metrics'}
        </Typography>
      </Box>

      {/* Loading State - Requirement 6.4 */}
      {loading && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='200px'
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error State - Requirement 6.5 */}
      {error && !loading && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Metrics Content - Rendered by tasks 9.2 and 9.3 */}
      {!loading && !error && metrics && (
        <Box>
          {/* SYSTEM_ADMIN view - Requirement 2.4, 2.5, 2.6, 6.2 */}
          {isSystemAdmin && isSystemAdminMetrics(metrics) && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MetricCard
                  title='Total Tenants'
                  value={metrics.metrics.totalTenants}
                  color='primary'
                  icon={<BusinessIcon />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MetricCard
                  title='Active Tenants'
                  value={metrics.metrics.activeTenants}
                  color='success'
                  icon={<CheckCircleIcon />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MetricCard
                  title='Inactive Tenants'
                  value={metrics.metrics.inactiveTenants}
                  color='error'
                  icon={<CancelIcon />}
                />
              </Grid>
            </Grid>
          )}

          {/* org_admin view - Requirement 3.4, 3.5, 3.6, 6.3 */}
          {isOrgAdmin && isOrgAdminMetrics(metrics) && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MetricCard
                  title='Total Users'
                  value={metrics.metrics.totalUsers}
                  color='primary'
                  icon={<PeopleIcon />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MetricCard
                  title='Active Users'
                  value={metrics.metrics.activeUsers}
                  color='success'
                  icon={<PersonIcon />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MetricCard
                  title='Inactive Users'
                  value={metrics.metrics.inactiveUsers}
                  color='error'
                  icon={<PersonOffIcon />}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </Layout>
  );
};

export default Dashboard;
