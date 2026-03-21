import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Tooltip,
  Stack,
  Alert,
  Menu
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Layout from '../layouts/Layout';
import { DynamicTable, type Column } from '../components/DynamicTable';
import {
  getAuditLogs,
  getAuditLogStats,
  exportAuditLogs,
  formatAction,
  formatEntity,
  getActionColor,
  type AuditLog,
  type AuditLogFilters,
  type AuditLogStats
} from '../services/auditLogService';
import { useAuth } from '../store/AuthContext';

const AuditLogPage = () => {
  const { tenantId, logout } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalLogs, setTotalLogs] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availableFilters, setAvailableFilters] = useState<any>({
    actions: [],
    entities: [],
    users: []
  });
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [stats, setStats] = useState<AuditLogStats | null>(null);
  const [statsPeriod, setStatsPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Define table columns
  const auditLogColumns: Column<AuditLog & { id: string }>[] = [
    { 
      key: 'timestamp', 
      label: 'Timestamp',
      render: (val) => formatTimestamp(val as string)
    },
    { 
      key: 'userName', 
      label: 'User',
      render: (val, item) => (
        <Box>
          <Typography variant="body2" fontWeight="500">{item.userName}</Typography>
          <Typography variant="caption" color="textSecondary">{item.userEmail}</Typography>
        </Box>
      )
    },
    { 
      key: 'action', 
      label: 'Action',
      render: (val) => (
        <Chip
          label={formatAction(val as string)}
          color={getActionChipColor(val as string)}
          size="small"
        />
      )
    },
    { 
      key: 'entity', 
      label: 'Entity',
      render: (val) => formatEntity(val as string)
    },
    { 
      key: 'entityName', 
      label: 'Entity Name',
      render: (val) => val || '-'
    },
    { 
      key: 'ipAddress', 
      label: 'IP Address',
      render: (val) => (
        <Typography variant="body2" fontFamily="monospace">
          {val || '-'}
        </Typography>
      )
    },
    { 
      key: 'responseStatus', 
      label: 'Status',
      render: (val) => val ? (
        <Chip
          label={val}
          color={(val as number) < 400 ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      ) : null
    },
    { key: 'actions', label: 'Actions' }
  ];

  useEffect(() => {
    fetchAuditLogs();
    fetchStats();
  }, [page, rowsPerPage, searchTerm, selectedAction, selectedEntity, selectedUser, startDate, endDate]);

  const fetchAuditLogs = async () => {
    if (!tenantId) {
      console.error("No Tenant ID found, redirecting to login");
      logout();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const filters: AuditLogFilters = {
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm || undefined,
        action: selectedAction || undefined,
        entity: selectedEntity || undefined,
        userId: selectedUser || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sortBy: 'timestamp',
        sortOrder: 'desc'
      };

      const response = await getAuditLogs(tenantId, filters);
      setLogs(response.data);
      setTotalLogs(response.pagination.total);
      setAvailableFilters(response.filters.available);
    } catch (err: any) {
      console.error('Error fetching audit logs:', err);
      setError(err.response?.data?.message || 'Failed to fetch audit logs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!tenantId) return;

    try {
      const statsData = await getAuditLogStats(tenantId, statsPeriod);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    if (!tenantId) return;

    try {
      const blob = await exportAuditLogs(tenantId, format, {
        search: searchTerm || undefined,
        action: selectedAction || undefined,
        entity: selectedEntity || undefined,
        userId: selectedUser || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error exporting logs:', err);
      setError('Failed to export audit logs');
    }
  };

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setDetailsOpen(true);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedAction('');
    setSelectedEntity('');
    setSelectedUser('');
    setStartDate('');
    setEndDate('');
  };

  const handleActionClick = (event: React.MouseEvent, log: AuditLog & { id: string }) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setSelectedLog(log);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetailsFromMenu = () => {
    if (selectedLog) {
      setDetailsOpen(true);
    }
    handleMenuClose();
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    } catch {
      return timestamp;
    }
  };

  const getActionChipColor = (action: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    const color = getActionColor(action);
    const colorMap: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
      'success': 'success',
      'error': 'error',
      'warning': 'warning',
      'info': 'info',
      'default': 'default'
    };
    return colorMap[color] || 'default';
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          Audit Logs
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('json')}
          >
            Export JSON
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchAuditLogs}
          >
            Refresh
          </Button>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      {stats && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Total Actions
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stats.summary.totalActions.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Unique Users
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stats.summary.uniqueUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Most Common Action
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {formatAction(stats.summary.mostCommonAction)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Most Active User
                </Typography>
                <Typography variant="h6" fontWeight="bold" noWrap>
                  {stats.summary.mostActiveUser}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={2.5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <FormControl fullWidth size="small" sx={{ minWidth: 250 }}>
              <InputLabel>Action</InputLabel>
              <Select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                label="Action"
              >
                <MenuItem value="">All Actions</MenuItem>
                {availableFilters.actions
                  .filter((action: string) => action && action.trim() !== '')
                  .map((action: string) => (
                    <MenuItem key={action} value={action}>
                      {formatAction(action)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 250 }}>
              <InputLabel>Entity</InputLabel>
              <Select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                label="Entity"
              >
                <MenuItem value="">All Entities</MenuItem>
                {availableFilters.entities
                  .filter((entity: string) => entity && entity.trim() !== '')
                  .map((entity: string) => (
                    <MenuItem key={entity} value={entity}>
                      {formatEntity(entity)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={1.5}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<CloseIcon />}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={5}>
          <CircularProgress />
        </Box>
      ) : logs.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <Typography color="textSecondary">No audit logs found</Typography>
        </Paper>
      ) : (
        <>
          <DynamicTable<AuditLog & { id: string }>
            columns={auditLogColumns}
            data={logs.map(log => ({ ...log, id: log._id }))}
            onActionClick={handleActionClick}
            showCheckbox={false}
          />
          <Box component={Paper} sx={{ p: 2, mt: 0, borderRadius: '0 0 8px 8px', borderTop: '1px solid #E2E8F0' }}>
            <TablePagination
              component="div"
              count={totalLogs}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 25, 50, 100]}
            />
          </Box>
        </>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetailsFromMenu}>
          <ViewIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
      </Menu>

      {/* Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Audit Log Details</Typography>
            <IconButton onClick={() => setDetailsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedLog && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">User</Typography>
                <Typography variant="body1" fontWeight="500">{selectedLog.userName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Email</Typography>
                <Typography variant="body1">{selectedLog.userEmail}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Role</Typography>
                <Typography variant="body1">{selectedLog.userRole}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Action</Typography>
                <Chip
                  label={formatAction(selectedLog.action)}
                  color={getActionChipColor(selectedLog.action)}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Entity</Typography>
                <Typography variant="body1">{formatEntity(selectedLog.entity)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Entity Name</Typography>
                <Typography variant="body1">{selectedLog.entityName || '-'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Timestamp</Typography>
                <Typography variant="body1">{formatTimestamp(selectedLog.timestamp)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">IP Address</Typography>
                <Typography variant="body1" fontFamily="monospace">{selectedLog.ipAddress || '-'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Response Status</Typography>
                <Typography variant="body1">{selectedLog.responseStatus || '-'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">Response Time</Typography>
                <Typography variant="body1">{selectedLog.responseTime ? `${selectedLog.responseTime}ms` : '-'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">Request URL</Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                  {selectedLog.requestUrl || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">User Agent</Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                  {selectedLog.userAgent || '-'}
                </Typography>
              </Grid>
              {selectedLog.details && (
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">Details</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 0.5, bgcolor: 'grey.50' }}>
                    <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
              {selectedLog.changes && (
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">Changes</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 0.5, bgcolor: 'grey.50' }}>
                    <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
                      {JSON.stringify(selectedLog.changes, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
              {selectedLog.errorMessage && (
                <Grid item xs={12}>
                  <Typography variant="caption" color="error">Error Message</Typography>
                  <Alert severity="error" sx={{ mt: 0.5 }}>
                    {selectedLog.errorMessage}
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Layout>
  );
};

export default AuditLogPage;