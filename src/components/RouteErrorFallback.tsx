import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const RouteErrorFallback = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message || 'Something went wrong'
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred';

  const isChunkLoadError =
    error instanceof Error &&
    (error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Loading chunk'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
      sx={{ bgcolor: 'grey.50' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 480,
          textAlign: 'center',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ErrorOutlineIcon
          color="error"
          sx={{ fontSize: 64, mb: 2 }}
        />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {isChunkLoadError ? 'Page failed to load' : 'Something went wrong'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {isChunkLoadError
            ? 'This can happen after a deployment or when the network is unstable. Try refreshing the page.'
            : message}
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mr: 1 }}
        >
          Refresh page
        </Button>
        <Button component={Link} to="/" variant="outlined">
          Go home
        </Button>
      </Paper>
    </Box>
  );
};

export default RouteErrorFallback;
