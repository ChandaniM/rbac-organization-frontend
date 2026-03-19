import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useRef, useState } from "react";

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

  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFormData((prev) => ({ ...prev, avatar: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onComplete?.(formData);
  };

  const avatarPreview = formData.avatar || null;

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Grid container spacing={3}>
          {/* Left column */}
          <Grid size={{ xs: 12, md: 6 }}>
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
            </Stack>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
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

              {/* Avatar: file input + small square preview */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <input
                  ref={avatarInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant='outlined'
                  component='span'
                  onClick={() => avatarInputRef.current?.click()}
                  startIcon={<PersonIcon />}
                >
                  Upload photo
                </Button>
                {avatarPreview && (
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                      flexShrink: 0,
                    }}
                  >
                    <Avatar
                      src={avatarPreview}
                      sx={{ width: 48, height: 48 }}
                      variant='rounded'
                    />
                  </Box>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>

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
