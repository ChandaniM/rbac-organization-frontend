import { Box, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      width={220}
      bgcolor="#f4f6f8"
      p={2}
      borderRight="1px solid #ddd"
    >
      <Typography variant="h6">Dashboard</Typography>

      <Typography variant="body2" mt={2}>
        Users
      </Typography>

      <Typography variant="body2">
        Roles
      </Typography>
    </Box>
  );
};

export default Sidebar;
