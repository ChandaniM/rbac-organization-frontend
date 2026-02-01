import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, Box, Typography, Select, MenuItem, FormControl,
  InputLabel, Stepper, Step, StepLabel,
} from "@mui/material";

interface CreateOrgDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { org: any; user: any }) => void;
  initialData?: any; // Added prop
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
    user: { email: "", username: "", password: "" },
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
          user: { email: "", username: initialData.username || "", password: "" },
        });
      } else {
        resetForm();
      }
    }
  }, [initialData, open]);

  const handleChange = (section: "org" | "user", field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
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
      user: { email: "", username: "", password: "" },
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
        {/* Step: Org Details (Step 0 always) */}
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

        {/* Step: User Details (Only if creating) */}
        {!initialData && activeStep === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Admin User Info</Typography>
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
            <TextField
              fullWidth label="Password" type="password"
              value={formData.user.password}
              onChange={(e) => handleChange("user", "password", e.target.value)}
              size="small" required
            />
          </Box>
        )}

        {/* Step: Review (Final Step) */}
        {activeStep === steps.length - 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Review Changes</Typography>
            <Typography variant="body2"><strong>Name:</strong> {formData.org.name}</Typography>
            <Typography variant="body2"><strong>Status:</strong> {formData.org.status}</Typography>
            {!initialData && (
              <Typography variant="body2"><strong>Admin User:</strong> {formData.user.username}</Typography>
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