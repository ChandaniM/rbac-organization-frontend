import { Card, CardContent, Typography, Box } from "@mui/material";

interface AnnouncementCardProps {
  title: string;
  description: string;
  date?: string;
}

const AnnouncementCard = ({ title, description, date }: AnnouncementCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {date && (
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
