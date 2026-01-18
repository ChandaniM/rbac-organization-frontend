import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import type { IUserDetailsState } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
interface NavbarProps {
  UserDetails: IUserDetailsState;
  setUserDetails: React.Dispatch<React.SetStateAction<IUserDetailsState>>;
}
const Navbar: React.FC<NavbarProps> = ({ UserDetails, setUserDetails }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("org");
    localStorage.removeItem("tenantId");

    // 🔄 Reset state
    setUserDetails({
      org: {} as any,
      user: {} as any,
    });

    // 🚀 Redirect to login
    navigate("/auth/login");
  };
  return (
    <>
      <AppBar
        position='static'
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #ddd",
          color: "black",
        }}
      >
        <Toolbar>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
          >
            <Typography variant='h6' fontWeight='bold'>
              {UserDetails.org.name ? UserDetails.org.name : ""}
            </Typography>

            {/* Profile Section matching your image */}
            <Stack direction='row' spacing={2} alignItems='center'>
              <Box textAlign='right'>
                <Typography variant='body2' fontWeight='bold'>
                  {UserDetails.user.username ? UserDetails.user.username : ""}
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                  {UserDetails.user.email ? UserDetails.user.email : ""}
                </Typography>
              </Box>
              <Avatar src='https://i.pravatar.cc/150?u=dipak' />
              <FiLogOut
        onClick={handleLogout}
        className="text-2xl cursor-pointer hover:text-red-400"
        title="Logout"
      />
            {/* <button
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded'
            >
              Logout
            </button> */}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
