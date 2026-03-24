import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  MailOutline,
  PhoneAndroid,
  LocationOnOutlined,
  BusinessCenterOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import DynamicDialog from "./DynamicDialog";
import AddUserForm from "./AddUserForm";
import { getUsersByTenant, createUser, updateUser, deleteUser } from "../services/employeeDirectory";

interface ManageOrgEmployeesDialogProps {
  open: boolean;
  onClose: () => void;
  organization: {
    id: string;
    name: string;
    display_name?: string;
  } | null;
}

const ManageOrgEmployeesDialog = ({ open, onClose, organization }: ManageOrgEmployeesDialogProps) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  useEffect(() => {
    if (open && organization?.id) {
      fetchEmployees();
    }
  }, [open, organization]);

  const fetchEmployees = async () => {
    if (!organization?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await getUsersByTenant(organization.id, 1, 100, "");
      setEmployees(response.users || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to fetch employees");
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployee = async (data: any) => {
    if (!organization?.id) return;
    
    try {
      await createUser(organization.id, {
        username: data.username,
        email: data.email,
        password: data.password,
        is_active: data.is_active,
        job_title: data.job_title,
        department: data.department,
        location: data.location,
        phone: data.phone,
        business_unit: data.business_unit,
        avatar: data.avatar,
      });
      setOpenAddUser(false);
      await fetchEmployees();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to create employee");
    }
  };

  const handleUpdateEmployee = async (data: any) => {
    if (!organization?.id || !selectedEmployee?.id) return;
    
    try {
      const payload: any = {
        username: data.username,
        email: data.email,
        is_active: data.is_active,
        job_title: data.job_title,
        department: data.department,
        location: data.location,
        phone: data.phone,
        business_unit: data.business_unit,
        avatar: data.avatar,
      };
      
      if (data.password && String(data.password).trim() !== "") {
        payload.password = data.password;
      }

      await updateUser(organization.id, selectedEmployee.id, payload);
      setOpenEditUser(false);
      setSelectedEmployee(null);
      await fetchEmployees();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to update employee");
    }
  };

  const handleDeleteEmployee = async (emp: any) => {
    if (!organization?.id || !emp?.id) return;
    
    const confirmed = window.confirm(`Delete employee "${emp.name}"?`);
    if (!confirmed) return;
    
    try {
      await deleteUser(organization.id, emp.id);
      await fetchEmployees();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to delete employee");
    }
  };

  const handleEditEmployee = (emp: any) => {
    setSelectedEmployee(emp);
    setOpenEditUser(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Manage Employees
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {organization?.display_name || organization?.name}
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Total Employees: {employees.length}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddUser(true)}
              size="small"
            >
              Add Employee
            </Button>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : employees.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography color="text.secondary">
                No employees found. Add your first employee!
              </Typography>
            </Box>
          ) : (
            <Box display="grid" gap={2}>
              {employees.map((emp) => (
                <Card
                  key={emp.id}
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                        <Avatar
                          src={emp.avatar}
                          sx={{ width: 48, height: 48, bgcolor: "primary.main" }}
                        >
                          {emp.name?.charAt(0) || "?"}
                        </Avatar>
                        <Box flex={1}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {emp.name}
                          </Typography>
                          <Typography variant="body2" color="primary" fontWeight={500}>
                            {emp.jobTitle || "No job title"}
                          </Typography>
                          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                            {emp.isActive ? (
                              <Chip label="Active" size="small" color="success" />
                            ) : (
                              <Chip label="Inactive" size="small" color="default" />
                            )}
                            {emp.emailVerified && (
                              <Chip label="Verified" size="small" color="info" />
                            )}
                          </Stack>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <IconButton
                          size="small"
                          onClick={() => handleEditEmployee(emp)}
                          aria-label="Edit employee"
                        >
                          <EditOutlined fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteEmployee(emp)}
                          aria-label="Delete employee"
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Divider sx={{ my: 1.5 }} />

                    <Stack spacing={1}>
                      {emp.email && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MailOutline sx={{ fontSize: 16, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {emp.email}
                          </Typography>
                        </Stack>
                      )}
                      {emp.phone && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PhoneAndroid sx={{ fontSize: 16, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {emp.phone}
                          </Typography>
                        </Stack>
                      )}
                      {(emp.department || emp.businessUnit) && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <BusinessCenterOutlined sx={{ fontSize: 16, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {[emp.department, emp.businessUnit].filter(Boolean).join(" • ")}
                          </Typography>
                        </Stack>
                      )}
                      {emp.location && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <LocationOnOutlined sx={{ fontSize: 16, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {emp.location}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Employee Dialog */}
      <DynamicDialog
        open={openAddUser}
        onClose={() => setOpenAddUser(false)}
        title="Add New Employee"
      >
        <AddUserForm
          onComplete={handleCreateEmployee}
          onClose={() => setOpenAddUser(false)}
        />
      </DynamicDialog>

      {/* Edit Employee Dialog */}
      <DynamicDialog
        open={openEditUser}
        onClose={() => {
          setOpenEditUser(false);
          setSelectedEmployee(null);
        }}
        title="Edit Employee"
      >
        <AddUserForm
          onComplete={handleUpdateEmployee}
          onClose={() => {
            setOpenEditUser(false);
            setSelectedEmployee(null);
          }}
          defaultValues={
            selectedEmployee
              ? {
                  username: selectedEmployee.name,
                  email: selectedEmployee.email,
                  is_active: selectedEmployee.isActive,
                  job_title: selectedEmployee.jobTitle,
                  department: selectedEmployee.department,
                  location: selectedEmployee.location,
                  phone: selectedEmployee.phone,
                  business_unit: selectedEmployee.businessUnit,
                  avatar: selectedEmployee.avatar,
                }
              : undefined
          }
        />
      </DynamicDialog>
    </>
  );
};

export default ManageOrgEmployeesDialog;
