import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Avatar,
  Typography,
  Button,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useAuth } from "../store/AuthContext";
import { updateProfileService } from "../services/profileService";

export default function SettingsPage() {
  const {
    username,
    email,
    role,
    orgName,
    isSystemAdmin,
  } = useAuth();

  const [active, setActive] = useState<"profile" | "admin">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
  });

  /* ---------- Populate form ---------- */
  useEffect(() => {
    if (username) {
      setFormData({ username });
    }
  }, [username]);

  /* ---------- Menu ---------- */
  const menuItems = [
    { key: "profile", label: "My Profile", icon: <PersonOutlineIcon /> },
    { key: "security", label: "Security Options", icon: <LockOutlinedIcon /> },
    { key: "preferences", label: "Preferences", icon: <TuneOutlinedIcon /> },
    { key: "notifications", label: "Notifications", icon: <NotificationsOutlinedIcon /> },
    ...(isSystemAdmin
      ? [
          {
            key: "admin",
            label: "System Settings",
            icon: <AdminPanelSettingsOutlinedIcon />,
          },
        ]
      : []),
  ];

  /* ---------- Handlers ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ username: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfileService({ username: formData.username });
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (err: any) {
      alert(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ username: username || "" });
    setIsEditing(false);
  };

  /* ---------- Render ---------- */
  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-[280px]">
        <Card className="p-4 rounded-2xl">
          <Typography variant="h6" fontWeight={600}>
            Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Manage your account settings
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.key}
                selected={active === item.key}
                onClick={() => setActive(item.key as any)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&.Mui-selected": {
                    bgcolor: "#eef2ff",
                    color: "#3f51b5",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Card>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Card className="p-8 rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Avatar sx={{ width: 56, height: 56 }}>
                {username?.[0]?.toUpperCase()}
              </Avatar>

              <div>
                <Typography fontWeight={600}>{username}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {email}
                </Typography>
              </div>
            </div>

            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* PROFILE */}
          {active === "profile" && (
            <>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Personal Details
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  fullWidth
                />

                <TextField
                  label="Email Address"
                  value={email || ""}
                  disabled
                  fullWidth
                />

                <TextField
                  label="Organization"
                  value={orgName || "-"}
                  disabled
                  fullWidth
                />

                <TextField
                  label="Role"
                  value={role || "-"}
                  disabled
                  fullWidth
                />
              </div>
            </>
          )}

          {/* ADMIN */}
          {active === "admin" && isSystemAdmin && (
            <>
              <Typography variant="h6" fontWeight={600} mb={2}>
                System Administration
              </Typography>

              <Typography color="text.secondary" mb={3}>
                Visible only to system administrators.
              </Typography>

              <Box className="flex gap-4">
                <Button variant="outlined">Manage Organizations</Button>
                <Button variant="outlined">Manage Users</Button>
              </Box>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
