import { Box } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/navbar";
// no layout-level user state needed (Navbar reads from AuthContext)

const  Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display='flex' height='100vh'>
      <Sidebar />

      <Box flex={1} display='flex' flexDirection='column'>
        <Navbar />
        <Box
          component='main'
          p={3}
          sx={{ flexGrow: 1, overflowY: "auto", bgcolor: "#F8FAFC" }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
