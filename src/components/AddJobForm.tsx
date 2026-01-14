import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
} from "@mui/material";

interface AddJobFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const AddJobForm = ({ onCancel, onSubmit }: AddJobFormProps) => {
  const departments = ["Engineering", "Product", "Design", "Marketing", "HR"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const experienceLevels = ["Junior", "Mid", "Senior", "Lead"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
              {/* Job Title */}
      <Box sx={{ mb: 2 }}>
        <TextField
          name='title'
          label='Job Title'
          fullWidth
          required
          size='small'
          placeholder='e.g. Senior React Developer'
        />
      </Box>

      {/* Department */}
      <Box sx={{ mb: 2 }}>
        <TextField
          name='department'
          select
          label='Department'
          fullWidth
          required
          size='small'
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Job Type */}
      <Box sx={{ mb: 2 }}>
        <TextField
          name='type'
          select
          label='Job Type'
          fullWidth
          required
          size='small'
        >
          {jobTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Experience */}
      <Box sx={{ mb: 2 }}>
        <TextField
          name='experience'
          select
          label='Experience Level'
          fullWidth
          size='small'
        >
          {experienceLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Location */}
      <Box sx={{ mb: 2 }}>
        <TextField
          name='location'
          label='Location'
          fullWidth
          size='small'
          defaultValue='Remote'
        />
      </Box>

      {/* Salary */}
      <Box sx={{ mb: 2 }}>
        <TextField
          name='salary'
          label='Salary Range'
          fullWidth
          size='small'
          placeholder='e.g. $80k – $120k'
          helperText='Optional'
        />
      </Box>

      {/* Description */}
      <Box sx={{ mb: 3 }}>
        <TextField
          name='description'
          label='Job Description'
          fullWidth
          multiline
          rows={5}
          placeholder='Describe responsibilities, requirements, and benefits...'
        />
      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button onClick={onCancel} color='inherit'>
          Cancel
        </Button>
        <Button type='submit' variant='contained'>
          Create Job
        </Button>
      </Box>
    </Box>
  );
};
