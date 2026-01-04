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
  Typography,
} from "@mui/material";

type AddUserFormProps = {
  onComplete?: (data: any) => void;
  onClose?: () => void;
};

const AddUserForm: React.FC<AddUserFormProps> = ({ onComplete, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // dummy payload (UI only)
    onComplete?.({
      username: "",
      email: "",
      is_active: true,
      role_id: "",
      send_invite: true,
    });
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label='Username'
          name='username'
          placeholder='john_doe'
          fullWidth
          required
        />
        <TextField
          label='Email Address'
          name='email'
          type='email'
          placeholder='john@example.com'
          fullWidth
          required
        />

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select name='is_active' label='Status' defaultValue='true'>
            <MenuItem value='true'>Active</MenuItem>
            <MenuItem value='false'>Inactive</MenuItem>
          </Select>
        </FormControl>

        {/* Role */}
        <FormControl fullWidth required>
          <InputLabel>Role</InputLabel>
          <Select name='role_id' label='Role' defaultValue=''>
            <MenuItem value=''>Select role</MenuItem>
            <MenuItem value={1}>Org Admin</MenuItem>
            <MenuItem value={2}>Manager</MenuItem>
            <MenuItem value={3}>Employee</MenuItem>
          </Select>
        </FormControl>

        {/* Invite */}
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label='Send email invitation'
        />

        {/* Actions */}
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            Add User
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddUserForm;
