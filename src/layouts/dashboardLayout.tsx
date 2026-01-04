import { Box, Typography } from "@mui/material";
import AddUser from "../features/addUser";
import Sidebar from "../components/Sidebar";
const DashboardLayout = () => {
  return (
    <Box display="flex" height="100vh">
       <Sidebar/>
      <Box flex={1} p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5">User Management</Typography>
        </Box>
        <AddUser />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
