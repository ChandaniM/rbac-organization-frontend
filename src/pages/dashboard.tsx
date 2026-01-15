import Layout from "../layouts/Layout";
import { Typography, Box } from "@mui/material";
import { useState } from "react";

const Dashboard = () => {
    const [pagination, setPagination] = useState({
        current: 2,
        pageSize: 10,
        total: 100
      });
    const handlePageAction = (newPage: number) => {
        console.log("User moved to page:", newPage);
        setPagination(prev => ({ ...prev, current: newPage }));
      };
  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="700">Dashboard Management</Typography>
        <div>
          
        </div>
      </Box>
    </Layout>
  );
};

export default Dashboard;