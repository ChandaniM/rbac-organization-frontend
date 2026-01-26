import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #ddd",
        color: "black",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          {/* Org name */}
          <Typography variant="h6" fontWeight="bold">
            {user?.org.display_name || user?.org.name}
          </Typography>

          {/* Profile section */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box textAlign="right">
              <Typography variant="body2" fontWeight="bold">
                {user?.user.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.user.email}
              </Typography>
            </Box>
            <Avatar src="https://i.pravatar.cc/150?u=dipak" />
            <FiLogOut
              onClick={handleLogout}
              className="text-2xl cursor-pointer hover:text-red-400"
              title="Logout"
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
