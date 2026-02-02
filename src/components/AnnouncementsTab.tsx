import { Card, Typography } from "@mui/material";

const AnnouncementsTab = () => {
  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Typography fontWeight={600}>Announcements</Typography>
      <Typography color="text.secondary" mt={1}>
        No announcements yet.
      </Typography>
    </Card>
  );
};

export default AnnouncementsTab;
