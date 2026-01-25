import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

interface CreateOrgDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { org: any; user: any }) => void;
}

const CreateOrgDialog: React.FC<CreateOrgDialogProps> = ({
  open,
  onClose,
  onSubmit,
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
    },
  });

  const steps = ["Organization Details", "Admin User Details", "Review"];

  const handleChange = (section: "org" | "user", field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    resetForm();
    setActiveStep(0);
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
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Organization & Admin User</DialogTitle>
      
      {/* Stepper */}
      <Box sx={{ px: 3, pt: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        {/* Step 0: Organization Details */}
        {activeStep === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Organization Information
            </Typography>
            <TextField
              fullWidth
              label="Organization Name"
              value={formData.org.name}
              onChange={(e) => handleChange("org", "name", e.target.value)}
              variant="outlined"
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Display Name"
              value={formData.org.display_name}
              onChange={(e) => handleChange("org", "display_name", e.target.value)}
              variant="outlined"
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.org.description}
              onChange={(e) => handleChange("org", "description", e.target.value)}
              variant="outlined"
              size="small"
              multiline
              rows={4}
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

        {/* Step 1: Admin User Details */}
        {activeStep === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Admin User Information
            </Typography>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.user.email}
              onChange={(e) => handleChange("user", "email", e.target.value)}
              variant="outlined"
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Username"
              value={formData.user.username}
              onChange={(e) => handleChange("user", "username", e.target.value)}
              variant="outlined"
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.user.password}
              onChange={(e) => handleChange("user", "password", e.target.value)}
              variant="outlined"
              size="small"
              required
            />
          </Box>
        )}

        {/* Step 2: Review */}
        {activeStep === 2 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Organization Details
              </Typography>
              <Box sx={{ pl: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2">
                  <strong>Name:</strong> {formData.org.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Display Name:</strong> {formData.org.display_name}
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> {formData.org.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {formData.org.status}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Admin User Details
              </Typography>
              <Box sx={{ pl: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2">
                  <strong>Email:</strong> {formData.user.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Username:</strong> {formData.user.username}
                </Typography>
                <Typography variant="body2">
                  <strong>Password:</strong> {"*".repeat(formData.user.password.length)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
        >
          {activeStep === steps.length - 1 ? "Create" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrgDialog;