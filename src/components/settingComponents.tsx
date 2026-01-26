// import { useState } from "react";
// import { Box, Card, Avatar, Typography, Button, TextField, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// export default function SettingsPage() {
//   const [active, setActive] = useState("profile");

//   return (
//     <div>
//       <div className="flex gap-6">
//         {/* Sidebar */}
//         <div className="w-full md:w-[280px]">
//           <Card className="p-4 rounded-2xl">
//             <Typography variant="h6" fontWeight={600}>
//               Settings
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mb={2}>
//               You can find all settings here.
//             </Typography>

//             <List>
//               {[
//                 { key: "profile", label: "My Profile", icon: <PersonOutlineIcon /> },
//                 { key: "security", label: "Security Options", icon: <LockOutlinedIcon /> },
//                 { key: "preferences", label: "Preferences", icon: <TuneOutlinedIcon /> },
//                 { key: "notifications", label: "Notifications", icon: <NotificationsOutlinedIcon /> },
//               ].map((item) => (
//                 <ListItemButton
//                   key={item.key}
//                   selected={active === item.key}
//                   onClick={() => setActive(item.key)}
//                   sx={{
//                     borderRadius: 2,
//                     mb: 0.5,
//                     "&.Mui-selected": {
//                       bgcolor: "#eef2ff",
//                       color: "#3f51b5",
//                     },
//                   }}
//                 >
//                   <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
//                   <ListItemText primary={item.label} />
//                 </ListItemButton>
//               ))}
//             </List>
//           </Card>
//         </div>

//         {/* Content */}
//         <div className="flex-1">
//           <Card className="p-8 rounded-2xl">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-4">
//                 <Avatar
//                   src="https://i.pravatar.cc/150?img=47"
//                   sx={{ width: 56, height: 56 }}
//                 />
//                 <div>
//                   <Typography fontWeight={600}>Leslie Alexander</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Customer Service Manager
//                   </Typography>
//                 </div>
//               </div>
//               <Button variant="contained" startIcon={<EditOutlinedIcon />}>
//                 Edit
//               </Button>
//             </div>

//             {/* Personal Details */}
//             <Typography variant="h6" fontWeight={600} mb={2}>
//               Personal Details
//             </Typography>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <TextField label="First Name" defaultValue="Leslie" fullWidth />
//               <TextField label="Last Name" defaultValue="Alexander" fullWidth />
//               <TextField label="Email Address" defaultValue="leslie@gmail.com" fullWidth />
//               <TextField label="Phone" defaultValue="+317-439-5139" fullWidth />
//               <TextField label="Bio" defaultValue="Customer Service Manager" fullWidth />
//               <TextField label="Gender" defaultValue="Female" fullWidth />
//               <TextField label="Date of Birth" defaultValue="10 June, 1994" fullWidth />
//               <TextField
//                 label="National ID"
//                 defaultValue="629 555-0129 333-0127"
//                 fullWidth
//               />
//             </div>

//             {/* Address */}
//             <Typography variant="h6" fontWeight={600} mt={6} mb={2}>
//               Address
//             </Typography>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <TextField label="Country" defaultValue="United States" fullWidth />
//               <TextField label="City / State" defaultValue="Los Angeles" fullWidth />
//               <TextField label="Postal Code" defaultValue="90001" fullWidth />
//               <TextField label="Tax ID" defaultValue="BH28F55219" fullWidth />
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   Box,
//   Card,
//   Avatar,
//   Typography,
//   Button,
//   TextField,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import { useAuth } from "../store/AuthContext";

// export default function SettingsPage() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("profile");

//   const isSystemAdmin = user?.role === "SYSTEM_ADMIN";

//   const menuItems = [
//     { key: "profile", label: "My Profile", icon: <PersonOutlineIcon /> },
//     { key: "security", label: "Security Options", icon: <LockOutlinedIcon /> },
//     { key: "preferences", label: "Preferences", icon: <TuneOutlinedIcon /> },
//     { key: "notifications", label: "Notifications", icon: <NotificationsOutlinedIcon /> },

//     // 🔐 ADMIN ONLY
//     ...(isSystemAdmin
//       ? [
//           {
//             key: "admin",
//             label: "System Settings",
//             icon: <AdminPanelSettingsOutlinedIcon />,
//           },
//         ]
//       : []),
//   ];

//   return (
//     <div className="flex gap-6">
//       {/* Sidebar */}
//       <div className="w-full md:w-[280px]">
//         <Card className="p-4 rounded-2xl">
//           <Typography variant="h6" fontWeight={600}>
//             Settings
//           </Typography>
//           <Typography variant="body2" color="text.secondary" mb={2}>
//             You can find all settings here.
//           </Typography>

//           <List>
//             {menuItems.map((item) => (
//               <ListItemButton
//                 key={item.key}
//                 selected={active === item.key}
//                 onClick={() => setActive(item.key)}
//                 sx={{
//                   borderRadius: 2,
//                   mb: 0.5,
//                   "&.Mui-selected": {
//                     bgcolor: "#eef2ff",
//                     color: "#3f51b5",
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ minWidth: 36 }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.label} />
//               </ListItemButton>
//             ))}
//           </List>
//         </Card>
//       </div>

//       {/* Content */}
//       <div className="flex-1">
//         <Card className="p-8 rounded-2xl">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4">
//               <Avatar sx={{ width: 56, height: 56 }}>
//                 {user?.user.username?.[0]?.toUpperCase()}
//               </Avatar>

//               <div>
//                 <Typography fontWeight={600}>
//                   {user?.user.username}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {user?.user.email}
//                 </Typography>
//               </div>
//             </div>

//             <Button variant="contained" startIcon={<EditOutlinedIcon />}>
//               Edit
//             </Button>
//           </div>

//           {/* PROFILE */}
//           {active === "profile" && (
//             <>
//               <Typography variant="h6" fontWeight={600} mb={2}>
//                 Personal Details
//               </Typography>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <TextField
//                   label="Username"
//                   value={user?.user.username || ""}
//                   fullWidth
//                   disabled
//                 />
//                 <TextField
//                   label="Email Address"
//                   value={user?.user.email || ""}
//                   fullWidth
//                   disabled
//                 />
//                 <TextField
//                   label="Organization"
//                   value={user?.org.display_name || user?.org.name}
//                   fullWidth
//                   disabled
//                 />
//                 <TextField
//                   label="Role"
//                   value={user?.role}
//                   fullWidth
//                   disabled
//                 />
//               </div>
//             </>
//           )}

//           {/* 🔐 ADMIN SECTION */}
//           {active === "admin" && isSystemAdmin && (
//             <>
//               <Typography variant="h6" fontWeight={600} mb={2}>
//                 System Administration
//               </Typography>

//               <Typography color="text.secondary" mb={3}>
//                 These settings are visible only to system administrators.
//               </Typography>

//               <Box>
//                 <Button variant="outlined" sx={{ mr: 2 }}>
//                   Manage Organizations
//                 </Button>
//                 <Button variant="outlined">
//                   Manage Users
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// }

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
  const { user } = useAuth();

  const [active, setActive] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  // populate form from JWT
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.user.username,
        email: user.user.email,
      });
    }
  }, [user]);

  const isSystemAdmin = user?.role === "SYSTEM_ADMIN";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData({
      username: user?.user.username || "",
      email: user?.user.email || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateProfileService({
        username: formData.username,
      });

      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (err: any) {
      alert(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-[280px]">
        <Card className="p-4 rounded-2xl">
          <Typography variant="h6" fontWeight={600}>
            Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            You can manage your account settings here.
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.key}
                selected={active === item.key}
                onClick={() => setActive(item.key)}
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
                {user?.user.username?.[0]?.toUpperCase()}
              </Avatar>

              <div>
                <Typography fontWeight={600}>
                  {user?.user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.user.email}
                </Typography>
              </div>
            </div>

            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                onClick={handleEdit}
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

          {/* PROFILE TAB */}
          {active === "profile" && (
            <>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Personal Details
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  fullWidth
                />

                <TextField
                  label="Email Address"
                  value={formData.email}
                  disabled
                  fullWidth
                />

                <TextField
                  label="Organization"
                  value={user?.org.display_name || user?.org.name}
                  disabled
                  fullWidth
                />

                <TextField
                  label="Role"
                  value={user?.role}
                  disabled
                  fullWidth
                />
              </div>
            </>
          )}

          {/* ADMIN TAB */}
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
