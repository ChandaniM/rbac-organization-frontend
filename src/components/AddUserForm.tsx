import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

type AddUserFormProps = {
  onComplete?: (data: any) => void;
  onClose?: () => void;
  defaultValues?: {
    username?: string;
    email?: string;
    is_active?: boolean;
    role_id?: string | number;
    password?: string;

    // Optional profile fields (for better display in directory)
    job_title?: string;
    department?: string;
    location?: string;
    phone?: string;
    business_unit?: string;
    avatar?: string;
  };
};

const AddUserForm: React.FC<AddUserFormProps> = ({
  onComplete,
  onClose,
  defaultValues,
}) => {
  const isEditMode = !!defaultValues;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    is_active: true,
    role_id: "",
    sendInvite: true,
    password: "",

    job_title: "",
    department: "",
    location: "",
    phone: "",
    business_unit: "",
    avatar: "",
  });

  /** 🔁 Prefill form in Edit mode */
  useEffect(() => {
    if (defaultValues) {
      setFormData((prev: any) => ({
        ...prev,
        ...defaultValues,
      }));
    }
  }, [defaultValues]);

  /** 🧠 Single change handler */
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "is_active"
            ? value === "true"
            : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData , "61")
    onComplete?.(formData);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label='Username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label='Email Address'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label={isEditMode ? "Password (optional)" : "Password"}
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required={!isEditMode}
        />

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name='is_active'
            value={String(formData.is_active)}
            label='Status'
            onChange={handleChange}
          >
            <MenuItem value='true'>Active</MenuItem>
            <MenuItem value='false'>Inactive</MenuItem>
          </Select>

        </FormControl>

        {/* Role */}
        <FormControl fullWidth required={false}>
          <InputLabel>Role</InputLabel>
          <Select
            name='role_id'
            value={formData.role_id}
            label='Role'
            onChange={handleChange}
          >
            <MenuItem value=''>Select role</MenuItem>
            <MenuItem value='ORG_ADMIN'>Org Admin</MenuItem>
            <MenuItem value='MANAGER'>Manager</MenuItem>
            <MenuItem value='EMPLOYEE'>Employee</MenuItem>
          </Select>
        </FormControl>

        {/* Extra fields */}
        <TextField
          label='Job Title'
          name='job_title'
          value={formData.job_title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Department'
          name='department'
          value={formData.department}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Location'
          name='location'
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Business Unit'
          name='business_unit'
          value={formData.business_unit}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Avatar URL'
          name='avatar'
          value={formData.avatar}
          onChange={handleChange}
          fullWidth
        />

        {/* Invite */}
        <FormControlLabel
          control={
            <Checkbox
              name='sendInvite'
              checked={formData.sendInvite}
              onChange={handleChange}
            />
          }
          label='Send email invitation'
        />

        {/* Actions */}
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            Save User
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddUserForm;
