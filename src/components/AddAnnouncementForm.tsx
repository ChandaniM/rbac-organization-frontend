import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Title as TitleIcon,
  Description as DescIcon,
  ErrorOutline as PriorityIcon,
} from "@mui/icons-material";

interface AnnouncementData {
  id?: string;
  title?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
}

interface AddAnnouncementFormProps {
  data?: AnnouncementData; // undefined => create, object => edit
  onClose: () => void;
  onComplete: (payload: AnnouncementData) => void;
}

const AddAnnouncementForm = ({ data, onClose, onComplete }: AddAnnouncementFormProps) => {
  const isEditMode = Boolean(data?.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [loading, setLoading] = useState(false);

  // Prefill when editing
  useEffect(() => {
    if (isEditMode && data) {
      setTitle(data.title || "");
      setDescription(data.description || "");
      setPriority(data.priority || "low");
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  }, [isEditMode, data]);

  const handleSubmit = async () => {
    if (!title || !description) return;

    setLoading(true);
    try {
      const payload: AnnouncementData = {
        id: isEditMode ? data!.id : crypto.randomUUID(), // new ID for create
        title,
        description,
        priority,
      };

      if (isEditMode) {
        console.log("✏️ UPDATE announcement", payload);
        // await AnnouncementService.update(payload.id!, payload);
      } else {
        const newPayload = { ...payload, createdAt: new Date().toISOString() };
        console.log("➕ CREATE announcement", newPayload);
        // await AnnouncementService.create(newPayload);
        Object.assign(payload, newPayload); // merge createdAt
      }

      onComplete(payload); // send back to parent
      onClose();
    } catch (error) {
      console.error("Failed to submit announcement", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Stack spacing={3}>
        {/* Title */}
        <Box>
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{ mb: 1, display: "block", textTransform: "uppercase" }}
          >
            Announcement Title
          </Typography>
          <TextField
            placeholder="e.g., Annual Office Meetup 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, bgcolor: "#fcfcfc" },
            }}
          />
        </Box>

        {/* Description */}
        <Box>
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{ mb: 1, display: "block", textTransform: "uppercase" }}
          >
            Content / Description
          </Typography>
          <TextField
            placeholder="Describe the details of your announcement..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, bgcolor: "#fcfcfc" },
            }}
            helperText={`${description.length}/500 characters`}
          />
        </Box>

        {/* Priority */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <PriorityIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              Priority Level
            </Typography>
          </Stack>

          <ToggleButtonGroup
            value={priority}
            exclusive
            onChange={(_, val) => val && setPriority(val)}
            fullWidth
            sx={{
              gap: 1,
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                border: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <ToggleButton value="low">Low</ToggleButton>
            <ToggleButton value="medium">Medium</ToggleButton>
            <ToggleButton value="high">High</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider />

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            onClick={onClose}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Discard
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleSubmit}
            disabled={loading || !title || !description}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              minWidth: 160,
            }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : isEditMode ? (
              "Update Announcement"
            ) : (
              "Post Announcement"
            )}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddAnnouncementForm;
