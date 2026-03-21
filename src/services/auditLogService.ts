import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const authToken = localStorage.getItem("token");

export interface AuditLog {
  _id: string;
  tenantId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  action: string;
  entity: string;
  entityId?: string;
  entityName?: string;
  details?: Record<string, any>;
  changes?: {
    before?: Record<string, any>;
    after?: Record<string, any>;
  };
  ipAddress?: string;
  userAgent?: string;
  requestMethod?: string;
  requestUrl?: string;
  responseStatus?: number;
  responseTime?: number;
  errorMessage?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
  action?: string;
  entity?: string;
  userRole?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AuditLogResponse {
  success: boolean;
  data: AuditLog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: {
    applied: string[];
    available: {
      actions: string[];
      entities: string[];
      users: { id: string; name: string }[];
    };
  };
}

export interface AuditLogStats {
  summary: {
    totalActions: number;
    uniqueUsers: number;
    mostCommonAction: string;
    mostActiveUser: string;
  };
  actionBreakdown: { action: string; count: number }[];
  entityBreakdown: { entity: string; count: number }[];
  timelineData: { date: string; count: number }[];
  userActivity: { userName: string; count: number }[];
}

// 1. FETCH AUDIT LOGS WITH FILTERS
export const getAuditLogs = async (
  tenantId: string,
  filters: AuditLogFilters = {}
): Promise<AuditLogResponse> => {
  try {
    console.log("URL:", `${BASE_URL}/${tenantId}/audit-logs`);

    const response = await axios.get(
      `${BASE_URL}/${tenantId}/audit-logs`,
      {
        params: filters,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Fetch Error:", error.response?.data || error.message);
    throw error;
  }
};

// 2. GET SINGLE AUDIT LOG BY ID
export const getAuditLogById = async (
  tenantId: string,
  logId: string
): Promise<AuditLog> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${tenantId}/audit-logs/${logId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("Fetch Error:", error.response?.data || error.message);
    throw error;
  }
};

// 3. GET AUDIT LOG STATISTICS
export const getAuditLogStats = async (
  tenantId: string,
  period: 'day' | 'week' | 'month' = 'week'
): Promise<AuditLogStats> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${tenantId}/audit-logs/stats`,
      {
        params: { period },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("Stats Error:", error.response?.data || error.message);
    throw error;
  }
};

// 4. EXPORT AUDIT LOGS
export const exportAuditLogs = async (
  tenantId: string,
  format: 'csv' | 'json' = 'csv',
  filters: AuditLogFilters = {}
): Promise<Blob> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${tenantId}/audit-logs/export`,
      {
        params: { format, ...filters },
        responseType: 'blob',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Export Error:", error.response?.data || error.message);
    throw error;
  }
};

// Helper function to format action names
export const formatAction = (action: string): string => {
  if (!action || action.trim() === '') {
    return 'Unknown';
  }
  
  const actionMap: Record<string, string> = {
    'CREATE': 'Created',
    'UPDATE': 'Updated',
    'DELETE': 'Deleted',
    'VIEW': 'Viewed',
    'EXPORT': 'Exported',
    'IMPORT': 'Imported',
    'LOGIN': 'Logged In',
    'LOGOUT': 'Logged Out',
    'LOGIN_FAILED': 'Login Failed',
    'PASSWORD_RESET': 'Reset Password',
    'PASSWORD_CHANGE': 'Changed Password',
    'PERMISSION_GRANTED': 'Granted Permission',
    'PERMISSION_REVOKED': 'Revoked Permission',
    'ROLE_ASSIGNED': 'Assigned Role',
    'ROLE_REMOVED': 'Removed Role',
    'INVITATION_SENT': 'Sent Invitation',
    'INVITATION_ACCEPTED': 'Accepted Invitation',
    'INVITATION_REJECTED': 'Rejected Invitation',
    'FILE_UPLOAD': 'Uploaded File',
    'FILE_DOWNLOAD': 'Downloaded File',
    'FILE_DELETE': 'Deleted File',
    'SETTINGS_CHANGED': 'Changed Settings',
    'BULK_ACTION': 'Bulk Action',
    'APPROVAL': 'Approved',
    'REJECTION': 'Rejected',
    'UNKNOWN': 'Unknown Action'
  };
  return actionMap[action.toUpperCase()] || action;
};

// Helper function to format entity names
export const formatEntity = (entity: string): string => {
  if (!entity || entity.trim() === '') {
    return 'Unknown';
  }
  
  const entityMap: Record<string, string> = {
    'USER': 'User',
    'ORGANIZATION': 'Organization',
    'ROLE': 'Role',
    'PERMISSION': 'Permission',
    'ROLE_PERMISSION': 'Role Permission',
    'ANNOUNCEMENT': 'Announcement',
    'JOB': 'Job',
    'DOCUMENT': 'Document',
    'DASHBOARD': 'Dashboard',
    'SETTINGS': 'Settings',
    'INVITATION': 'Invitation',
    'SESSION': 'Session',
    'FILE': 'File',
    'REPORT': 'Report',
    'AUDIT_LOG': 'Audit Log',
    'UNKNOWN': 'Unknown Entity'
  };
  return entityMap[entity.toUpperCase()] || entity;
};

// Get action color for UI
export const getActionColor = (action: string): string => {
  const colorMap: Record<string, string> = {
    'CREATE': 'success',
    'UPDATE': 'info',
    'DELETE': 'error',
    'VIEW': 'default',
    'LOGIN': 'success',
    'LOGOUT': 'warning',
    'LOGIN_FAILED': 'error',
    'PASSWORD_RESET': 'warning',
    'PASSWORD_CHANGE': 'info',
    'PERMISSION_GRANTED': 'success',
    'PERMISSION_REVOKED': 'error',
    'ROLE_ASSIGNED': 'success',
    'ROLE_REMOVED': 'warning',
    'FILE_UPLOAD': 'success',
    'FILE_DOWNLOAD': 'info',
    'FILE_DELETE': 'error',
    'APPROVAL': 'success',
    'REJECTION': 'error'
  };
  return colorMap[action] || 'default';
};