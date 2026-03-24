import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, Box, Typography, Select, MenuItem, FormControl,
  InputLabel, Stepper, Step, StepLabel, FormControlLabel, Checkbox,
} from "@mui/material";

interface CreateOrgDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { org: any; user: any; sendInviteEmail?: boolean }) => void;
  initialData?: any;
}

const CreateOrgDialog: React.FC<CreateOrgDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    org: {
      name: "",
      display_name: "",
      description: "",
      status: "active",
      created_by: localStorage.getItem("username") || "",
    },
    user: { 
      email: "", 
      username: "", 
      password: "",
      is_active: true,
      job_title: "",
      department: "",
      location: "",
      phone: "",
      business_unit: "",
    },
    sendInviteEmail: true,
  });

  // Steps change if editing (usually you don't recreate the admin user on edit)
  const steps = initialData 
    ? ["Organization Details", "Review"] 
    : ["Organization Details", "Admin User Details", "Review"];

  // Populate form when initialData changes
  useEffect(() => {
    if (open) {
      setActiveStep(0); // Reset stepper on open
      if (initialData) {
        setFormData({
          org: {
            name: initialData.name || "",
            display_name: initialData.display_name || "",
            description: initialData.description || "",
            status: initialData.status || "active",
            created_by: initialData.created_by || "",
          },
          user: { 
            email: "", 
            username: initialData.username || "", 
            password: "",
            is_active: true,
            job_title: "",
            department: "",
            location: "",
            phone: "",
            business_unit: "",
          },
          sendInviteEmail: false,
        });
      } else {
        resetForm();
      }
    }
  }, [initialData, open]);

  const handleChange = (section: "org" | "user", field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { 
        ...prev[section], 
        [field]: field === "is_active" ? value === "true" : value 
      },
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onSubmit(formData);
      resetForm();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const resetForm = () => {
    setFormData({
      org: {
        name: "",
        display_name: "",
        description: "",
        status: "active",
        created_by: localStorage.getItem("username") || "",
      },
      user: { 
        email: "", 
        username: "", 
        password: "",
        is_active: true,
        job_title: "",
        department: "",
        location: "",
        phone: "",
        business_unit: "",
      },
      sendInviteEmail: true,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? "Edit Organization" : "Create Organization & Admin User"}
      </DialogTitle>
      
      <Box sx={{ px: 3, pt: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        {/* Step 0: Organization Details */}
        {activeStep === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Organization Info</Typography>
            <TextField
              fullWidth label="Organization Name"
              value={formData.org.name}
              onChange={(e) => handleChange("org", "name", e.target.value)}
              size="small" required
            />
            <TextField
              fullWidth label="Display Name"
              value={formData.org.display_name}
              onChange={(e) => handleChange("org", "display_name", e.target.value)}
              size="small" required
            />
            <TextField
              fullWidth label="Description"
              value={formData.org.description}
              onChange={(e) => handleChange("org", "description", e.target.value)}
              size="small" multiline rows={3}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.org.status}
                onChange={(e) => handleChange("org", "status", e.target.value)}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Step 1: Admin User Details (Only when creating new org) */}
        {!initialData && activeStep === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Admin User Info</Typography>
            
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <TextField
                fullWidth label="Email" type="email"
                value={formData.user.email}
                onChange={(e) => handleChange("user", "email", e.target.value)}
                size="small" required
              />
              <TextField
                fullWidth label="Username"
                value={formData.user.username}
                onChange={(e) => handleChange("user", "username", e.target.value)}
                size="small" required
              />
            </Box>

            <TextField
              fullWidth label="Password" type="password"
              value={formData.user.password}
              onChange={(e) => handleChange("user", "password", e.target.value)}
              size="small" required
            />

            <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 1 }}>
              Additional Information
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <TextField
                fullWidth label="Job Title"
                value={formData.user.job_title}
                onChange={(e) => handleChange("user", "job_title", e.target.value)}
                size="small"
              />
              <TextField
                fullWidth label="Department"
                value={formData.user.department}
                onChange={(e) => handleChange("user", "department", e.target.value)}
                size="small"
              />
              <TextField
                fullWidth label="Business Unit"
                value={formData.user.business_unit}
                onChange={(e) => handleChange("user", "business_unit", e.target.value)}
                size="small"
              />
              <TextField
                fullWidth label="Location"
                value={formData.user.location}
                onChange={(e) => handleChange("user", "location", e.target.value)}
                size="small"
              />
              <TextField
                fullWidth label="Phone"
                value={formData.user.phone}
                onChange={(e) => handleChange("user", "phone", e.target.value)}
                size="small"
                placeholder="+91 90000 00001"
              />
              <FormControl fullWidth size="small">
                <InputLabel>User Status</InputLabel>
                <Select
                  value={formData.user.is_active ? "true" : "false"}
                  onChange={(e) => handleChange("user", "is_active", e.target.value)}
                  label="User Status"
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}

        {/* Step: Review (Final Step) */}
        {activeStep === steps.length - 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Review Changes</Typography>

            <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 1 }}>Organization</Typography>
            <Typography variant="body2"><strong>Name:</strong> {formData.org.name || "—"}</Typography>
            <Typography variant="body2"><strong>Display Name:</strong> {formData.org.display_name || "—"}</Typography>
            <Typography variant="body2"><strong>Description:</strong> {formData.org.description || "—"}</Typography>
            <Typography variant="body2"><strong>Status:</strong> {formData.org.status || "—"}</Typography>

            {!initialData && (
              <>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2 }}>Admin User</Typography>
                <Typography variant="body2"><strong>Email:</strong> {formData.user.email || "—"}</Typography>
                <Typography variant="body2"><strong>Username:</strong> {formData.user.username || "—"}</Typography>
                <Typography variant="body2"><strong>Password:</strong> {formData.user.password ? "••••••" : "—"}</Typography>
                <Typography variant="body2"><strong>Status:</strong> {formData.user.is_active ? "Active" : "Inactive"}</Typography>
                <Typography variant="body2"><strong>Job Title:</strong> {formData.user.job_title || "—"}</Typography>
                <Typography variant="body2"><strong>Department:</strong> {formData.user.department || "—"}</Typography>
                <Typography variant="body2"><strong>Business Unit:</strong> {formData.user.business_unit || "—"}</Typography>
                <Typography variant="body2"><strong>Location:</strong> {formData.user.location || "—"}</Typography>
                <Typography variant="body2"><strong>Phone:</strong> {formData.user.phone || "—"}</Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.sendInviteEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, sendInviteEmail: e.target.checked }))}
                    />
                  }
                  label="Send invite email to admin (welcome with login credentials)"
                  sx={{ mt: 1 }}
                />
              </>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => setActiveStep(prev => prev - 1)} disabled={activeStep === 0}>Back</Button>
        <Button onClick={handleNext} variant="contained">
          {activeStep === steps.length - 1 ? (initialData ? "Update" : "Create") : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrgDialog;