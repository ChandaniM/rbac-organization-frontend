import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
const Navbar = () => {
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
              Easy LMS
            </Typography>

            {/* Profile Section matching your image */}
            <Stack direction='row' spacing={2} alignItems='center'>
              <Box textAlign='right'>
                <Typography variant='body2' fontWeight='bold'>
                  Dipak D
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                  Super Admin
                </Typography>
              </Box>
              <Avatar src='https://i.pravatar.cc/150?u=dipak' />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
