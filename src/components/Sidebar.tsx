import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSystemAdmin , isOrgAdmin , token , username } = useAuth();
  
  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Organization Directory", path: "/org-directory" },
    ...(username !== "SYSTEM_ADMIN"
      ? [{ name: "Org Tree", path: "/org-tree" }]
      : []),
    ...(username  !== "SYSTEM_ADMIN"
      ? [{ name: "Job Portal", path: "/job-portal" }]
      : []),
  
    { name: "Setting", path: "/setting" },
  ];
  
  return (
    <List
      sx={{
        width: 240,
        borderRight: "1px solid #ddd",
        height: "100vh",
        bgcolor: "white",
      }}
    >
      {menu.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: isActive ? "#F1F5F9" : "transparent",
                "&:hover": {
                  backgroundColor: "#F8FAFC",
                },
                borderLeft: isActive
                  ? "4px solid #3B82F6"
                  : "4px solid transparent",
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "400",
                  // Light shine blue color for text when active
                  color: isActive ? "#3B82F6" : "#64748B",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
