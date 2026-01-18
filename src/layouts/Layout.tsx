import { Box} from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import type { IOrg, IUser, IUserDetailsState } from "../types/auth.types";

const  Layout = ({ children }: { children: React.ReactNode }) => {
  const [UserDetails, setUserDetails] = useState<IUserDetailsState>({
    org: {} as IOrg,
    user: {} as IUser,
  });
  
  useEffect(() => {
    const org = localStorage.getItem("org");
    const userDetails = localStorage.getItem("user");
  
    setUserDetails({
      org: org ? JSON.parse(org) : {},
      user: userDetails ? JSON.parse(userDetails) : {},
    });
  }, []);
  
  
  return (
    <Box display='flex' height='100vh'>
      <Sidebar />

      <Box flex={1} display='flex' flexDirection='column'>
        <Navbar UserDetails={UserDetails} setUserDetails={setUserDetails} />
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
