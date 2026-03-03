import axios from 'axios';
import endpoints from '../../endpoints';

const BASE_URL = 'http://localhost:3000/api';

/**
 * Response structure for SYSTEM_ADMIN dashboard metrics
 */
export interface SystemAdminMetricsResponse {
  metrics: {
    totalTenants: number;
    activeTenants: number;
    inactiveTenants: number;
  };
}

/**
 * Response structure for org_admin dashboard metrics
 */
export interface OrgAdminMetricsResponse {
  tenantId: string;
  orgName: string;
  metrics: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
  };
}

/**
 * Fetches dashboard metrics from the API.
 * The response type depends on the user's role (determined by JWT on backend):
 * - SYSTEM_ADMIN: Returns tenant statistics
 * - org_admin: Returns user statistics for their organization
 *
 * @returns Promise resolving to either SystemAdminMetricsResponse or OrgAdminMetricsResponse
 * @throws Error if no token is found or API request fails
 *
 * Validates: Requirements 5.8
 */
export const getMetrics = async (): Promise<
  SystemAdminMetricsResponse | OrgAdminMetricsResponse
> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get<
    SystemAdminMetricsResponse | OrgAdminMetricsResponse
  >(`${BASE_URL}${endpoints.dashboard}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
