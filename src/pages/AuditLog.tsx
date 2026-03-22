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
      <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh' }}>
        {/* Header Section */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
              Audit Logs
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
              Monitor and track system-wide activity and security events.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
             <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchAuditLogs}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              disableElevation
              startIcon={<DownloadIcon />}
              onClick={() => handleExport('csv')}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: '#0f172a' }}
            >
              Export Data
            </Button>
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Statistics Cards - Modernized */}
        {stats && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { label: 'Total Actions', value: stats.summary.totalActions.toLocaleString(), sub: 'Last 30 days' },
              { label: 'Unique Users', value: stats.summary.uniqueUsers, sub: 'Active contributors' },
              { label: 'Common Action', value: formatAction(stats.summary.mostCommonAction), sub: 'Most frequent' },
              { label: 'Most Active', value: stats.summary.mostActiveUser, sub: 'Top contributor' }
            ].map((card, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography sx={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600, mb: 1 }}>
                      {card.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                      {card.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      {card.sub}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Filter Toolbar - Clean & Consolidated */}
        <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: '#94a3b8' }} />,
                  sx: { borderRadius: 2, bgcolor: '#f1f5f9', border: 'none', '& fieldset': { border: 'none' } }
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small" style={{minWidth:"150px"}}>
                <InputLabel>Action</InputLabel>
                <Select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  label="Action"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All Actions</MenuItem>
                  {availableFilters.actions.map((a: string) => (
                    <MenuItem key={a} value={a}>{formatAction(a)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} >
              <FormControl fullWidth size="small" style={{minWidth:"150px"}}>
                <InputLabel>Entity</InputLabel>
                <Select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  label="Entity"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All Entities</MenuItem>
                  {availableFilters.entities.map((e: string) => (
                    <MenuItem key={e} value={e}>{formatEntity(e)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  sx={{ '& .MuiInputBase-root': { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  sx={{ '& .MuiInputBase-root': { borderRadius: 2 } }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="text"
                onClick={handleClearFilters}
                startIcon={<CloseIcon />}
                sx={{ borderRadius: 2, color: '#64748b', textTransform: 'none' }}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Table Section */}
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" py={10}>
              <CircularProgress size={32} thickness={5} sx={{ color: '#0f172a' }} />
            </Box>
          ) : (
            <>
              <DynamicTable<AuditLog & { id: string }>
                columns={auditLogColumns}
                data={logs.map(log => ({ ...log, id: log._id }))}
                onActionClick={handleActionClick}
                showCheckbox={false}
              />
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
                sx={{ borderTop: '1px solid #e2e8f0', bgcolor: '#fafafa' }}
              />
            </>
          )}
        </Paper>
      </Box>

      {/* Details Dialog - Using a "Sidebar-style" or Clean Modal */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="700">Event Details</Typography>
            <IconButton onClick={() => setDetailsOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ borderBottom: 'none' }}>
           {/* Content layout remains similar, but use Box with sx for spacing */}
           {/* Ensure JSON blocks have a modern "Code" look */}
           <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: '#0f172a', color: '#e2e8f0', borderRadius: 2 }}>
              <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
                {JSON.stringify(selectedLog?.details, null, 2)}
              </pre>
           </Paper>
        </DialogContent>
      </Dialog>
    </Layout>
  );
  // return (
  //   <Layout>
  //     <Box sx={{ p: 3 }}>
  //     <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //       <Typography variant="h4" fontWeight="bold">
  //         Audit Logs
  //       </Typography>
  //       <Stack direction="row" spacing={2}>
  //         <Button
  //           variant="outlined"
  //           startIcon={<DownloadIcon />}
  //           onClick={() => handleExport('csv')}
  //         >
  //           Export CSV
  //         </Button>
  //         <Button
  //           variant="outlined"
  //           startIcon={<DownloadIcon />}
  //           onClick={() => handleExport('json')}
  //         >
  //           Export JSON
  //         </Button>
  //         <Button
  //           variant="outlined"
  //           startIcon={<RefreshIcon />}
  //           onClick={fetchAuditLogs}
  //         >
  //           Refresh
  //         </Button>
  //       </Stack>
  //     </Box>

  //     {error && (
  //       <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
  //         {error}
  //       </Alert>
  //     )}

  //     {/* Statistics Cards */}
  //     {stats && (
  //       <Grid container spacing={2} sx={{ mb: 3 }}>
  //         <Grid item xs={12} sm={6} md={3}>
  //           <Card>
  //             <CardContent>
  //               <Typography color="textSecondary" gutterBottom variant="body2">
  //                 Total Actions
  //               </Typography>
  //               <Typography variant="h4" fontWeight="bold">
  //                 {stats.summary.totalActions.toLocaleString()}
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //         <Grid item xs={12} sm={6} md={3}>
  //           <Card>
  //             <CardContent>
  //               <Typography color="textSecondary" gutterBottom variant="body2">
  //                 Unique Users
  //               </Typography>
  //               <Typography variant="h4" fontWeight="bold">
  //                 {stats.summary.uniqueUsers}
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //         <Grid item xs={12} sm={6} md={3}>
  //           <Card>
  //             <CardContent>
  //               <Typography color="textSecondary" gutterBottom variant="body2">
  //                 Most Common Action
  //               </Typography>
  //               <Typography variant="h6" fontWeight="bold">
  //                 {formatAction(stats.summary.mostCommonAction)}
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //         <Grid item xs={12} sm={6} md={3}>
  //           <Card>
  //             <CardContent>
  //               <Typography color="textSecondary" gutterBottom variant="body2">
  //                 Most Active User
  //               </Typography>
  //               <Typography variant="h6" fontWeight="bold" noWrap>
  //                 {stats.summary.mostActiveUser}
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //       </Grid>
  //     )}

  //     {/* Filters */}
  //     <Paper sx={{ p: 2, mb: 2 }}>
  //       <Grid container spacing={2} alignItems="center">
  //         <Grid item xs={12} md={2.5}>
  //           <TextField
  //             fullWidth
  //             size="small"
  //             placeholder="Search..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             InputProps={{
  //               startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
  //             }}
  //           />
  //         </Grid>
  //         <Grid item xs={12} md={2.5}>
  //           <FormControl fullWidth size="small" sx={{ minWidth: 250 }}>
  //             <InputLabel>Action</InputLabel>
  //             <Select
  //               value={selectedAction}
  //               onChange={(e) => setSelectedAction(e.target.value)}
  //               label="Action"
  //             >
  //               <MenuItem value="">All Actions</MenuItem>
  //               {availableFilters.actions
  //                 .filter((action: string) => action && action.trim() !== '')
  //                 .map((action: string) => (
  //                   <MenuItem key={action} value={action}>
  //                     {formatAction(action)}
  //                   </MenuItem>
  //                 ))}
  //             </Select>
  //           </FormControl>
  //         </Grid>
  //         <Grid item xs={12} md={2}>
  //           <FormControl fullWidth size="small" sx={{ minWidth: 250 }}>
  //             <InputLabel>Entity</InputLabel>
  //             <Select
  //               value={selectedEntity}
  //               onChange={(e) => setSelectedEntity(e.target.value)}
  //               label="Entity"
  //             >
  //               <MenuItem value="">All Entities</MenuItem>
  //               {availableFilters.entities
  //                 .filter((entity: string) => entity && entity.trim() !== '')
  //                 .map((entity: string) => (
  //                   <MenuItem key={entity} value={entity}>
  //                     {formatEntity(entity)}
  //                   </MenuItem>
  //                 ))}
  //             </Select>
  //           </FormControl>
  //         </Grid>
  //         <Grid item xs={12} md={2}>
  //           <TextField
  //             fullWidth
  //             size="small"
  //             type="date"
  //             label="Start Date"
  //             value={startDate}
  //             onChange={(e) => setStartDate(e.target.value)}
  //             InputLabelProps={{ shrink: true }}
  //           />
  //         </Grid>
  //         <Grid item xs={12} md={2}>
  //           <TextField
  //             fullWidth
  //             size="small"
  //             type="date"
  //             label="End Date"
  //             value={endDate}
  //             onChange={(e) => setEndDate(e.target.value)}
  //             InputLabelProps={{ shrink: true }}
  //           />
  //         </Grid>
  //         <Grid item xs={12} md={1.5}>
  //           <Button
  //             fullWidth
  //             variant="outlined"
  //             onClick={handleClearFilters}
  //             startIcon={<CloseIcon />}
  //           >
  //             Clear
  //           </Button>
  //         </Grid>
  //       </Grid>
  //     </Paper>

  //     {/* Table */}
  //     {loading ? (
  //       <Box display="flex" justifyContent="center" alignItems="center" py={5}>
  //         <CircularProgress />
  //       </Box>
  //     ) : logs.length === 0 ? (
  //       <Paper sx={{ p: 5, textAlign: 'center' }}>
  //         <Typography color="textSecondary">No audit logs found</Typography>
  //       </Paper>
  //     ) : (
  //       <>
  //         <DynamicTable<AuditLog & { id: string }>
  //           columns={auditLogColumns}
  //           data={logs.map(log => ({ ...log, id: log._id }))}
  //           onActionClick={handleActionClick}
  //           showCheckbox={false}
  //         />
  //         <Box component={Paper} sx={{ p: 2, mt: 0, borderRadius: '0 0 8px 8px', borderTop: '1px solid #E2E8F0' }}>
  //           <TablePagination
  //             component="div"
  //             count={totalLogs}
  //             page={page}
  //             onPageChange={(_, newPage) => setPage(newPage)}
  //             rowsPerPage={rowsPerPage}
  //             onRowsPerPageChange={(e) => {
  //               setRowsPerPage(parseInt(e.target.value, 10));
  //               setPage(0);
  //             }}
  //             rowsPerPageOptions={[10, 25, 50, 100]}
  //           />
  //         </Box>
  //       </>
  //     )}

  //     {/* Action Menu */}
  //     <Menu
  //       anchorEl={anchorEl}
  //       open={Boolean(anchorEl)}
  //       onClose={handleMenuClose}
  //     >
  //       <MenuItem onClick={handleViewDetailsFromMenu}>
  //         <ViewIcon fontSize="small" sx={{ mr: 1 }} />
  //         View Details
  //       </MenuItem>
  //     </Menu>

  //     {/* Details Dialog */}
  //     <Dialog
  //       open={detailsOpen}
  //       onClose={() => setDetailsOpen(false)}
  //       maxWidth="md"
  //       fullWidth
  //     >
  //       <DialogTitle>
  //         <Box display="flex" justifyContent="space-between" alignItems="center">
  //           <Typography variant="h6">Audit Log Details</Typography>
  //           <IconButton onClick={() => setDetailsOpen(false)}>
  //             <CloseIcon />
  //           </IconButton>
  //         </Box>
  //       </DialogTitle>
  //       <DialogContent dividers>
  //         {selectedLog && (
  //           <Grid container spacing={2}>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">User</Typography>
  //               <Typography variant="body1" fontWeight="500">{selectedLog.userName}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Email</Typography>
  //               <Typography variant="body1">{selectedLog.userEmail}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Role</Typography>
  //               <Typography variant="body1">{selectedLog.userRole}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Action</Typography>
  //               <Chip
  //                 label={formatAction(selectedLog.action)}
  //                 color={getActionChipColor(selectedLog.action)}
  //                 size="small"
  //                 sx={{ mt: 0.5 }}
  //               />
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Entity</Typography>
  //               <Typography variant="body1">{formatEntity(selectedLog.entity)}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Entity Name</Typography>
  //               <Typography variant="body1">{selectedLog.entityName || '-'}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Timestamp</Typography>
  //               <Typography variant="body1">{formatTimestamp(selectedLog.timestamp)}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">IP Address</Typography>
  //               <Typography variant="body1" fontFamily="monospace">{selectedLog.ipAddress || '-'}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Response Status</Typography>
  //               <Typography variant="body1">{selectedLog.responseStatus || '-'}</Typography>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography variant="caption" color="textSecondary">Response Time</Typography>
  //               <Typography variant="body1">{selectedLog.responseTime ? `${selectedLog.responseTime}ms` : '-'}</Typography>
  //             </Grid>
  //             <Grid item xs={12}>
  //               <Typography variant="caption" color="textSecondary">Request URL</Typography>
  //               <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
  //                 {selectedLog.requestUrl || '-'}
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={12}>
  //               <Typography variant="caption" color="textSecondary">User Agent</Typography>
  //               <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
  //                 {selectedLog.userAgent || '-'}
  //               </Typography>
  //             </Grid>
  //             {selectedLog.details && (
  //               <Grid item xs={12}>
  //                 <Typography variant="caption" color="textSecondary">Details</Typography>
  //                 <Paper variant="outlined" sx={{ p: 2, mt: 0.5, bgcolor: 'grey.50' }}>
  //                   <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
  //                     {JSON.stringify(selectedLog.details, null, 2)}
  //                   </pre>
  //                 </Paper>
  //               </Grid>
  //             )}
  //             {selectedLog.changes && (
  //               <Grid item xs={12}>
  //                 <Typography variant="caption" color="textSecondary">Changes</Typography>
  //                 <Paper variant="outlined" sx={{ p: 2, mt: 0.5, bgcolor: 'grey.50' }}>
  //                   <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
  //                     {JSON.stringify(selectedLog.changes, null, 2)}
  //                   </pre>
  //                 </Paper>
  //               </Grid>
  //             )}
  //             {selectedLog.errorMessage && (
  //               <Grid item xs={12}>
  //                 <Typography variant="caption" color="error">Error Message</Typography>
  //                 <Alert severity="error" sx={{ mt: 0.5 }}>
  //                   {selectedLog.errorMessage}
  //                 </Alert>
  //               </Grid>
  //             )}
  //           </Grid>
  //         )}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setDetailsOpen(false)}>Close</Button>
  //       </DialogActions>
  //     </Dialog>
  //   </Box>
  //   </Layout>
  // );
};

export default AuditLogPage;