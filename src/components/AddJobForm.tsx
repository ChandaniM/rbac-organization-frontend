import {
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

interface AddJobFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
  defaultValues?: {
    title?: string;
    department?: string;
    type?: string;
    experience?: string;
    location?: string;
    salary?: string;
    description?: string;
  };
}

export const AddJobForm = ({
  onCancel,
  onSubmit,
  defaultValues,
}: AddJobFormProps) => {
  const departments = ["Engineering", "Product", "Design", "Marketing", "HR"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const experienceLevels = ["Junior", "Mid", "Senior", "Lead"];

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    type: "",
    experience: "",
    location: "Remote",
    salary: "",
    description: "",
  });

  // 🔥 Prefill data when editing
  useEffect(() => {
    if (defaultValues) {
      setFormData((prev) => ({
        ...prev,
        ...defaultValues,
      }));
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Job Title */}
      <Box mb={2}>
        <TextField
          name="title"
          label="Job Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        />
      </Box>

      {/* Department */}
      <Box mb={2}>
        <TextField
          name="department"
          select
          label="Department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Job Type */}
      <Box mb={2}>
        <TextField
          name="type"
          select
          label="Job Type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          required
          size="small"
        >
          {jobTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Experience */}
      <Box mb={2}>
        <TextField
          name="experience"
          select
          label="Experience Level"
          value={formData.experience}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          {experienceLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Location */}
      <Box mb={2}>
        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Box>

      {/* Salary */}
      <Box mb={2}>
        <TextField
          name="salary"
          label="Salary Range"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          size="small"
          helperText="Optional"
        />
      </Box>

      {/* Description */}
      <Box mb={3}>
        <TextField
          name="description"
          label="Job Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={5}
        />
      </Box>

      {/* Actions */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {defaultValues ? "Update Job" : "Create Job"}
        </Button>
      </Box>
    </Box>
  );
};
