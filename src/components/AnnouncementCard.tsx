import { Card, CardContent, Typography, Box, Stack, Chip, IconButton, Tooltip } from "@mui/material";
import { CalendarMonth, Edit, DeleteOutline, MoreVert } from "@mui/icons-material";

interface AnnouncementCardProps {
  title: string;
  description: string;
  date?: string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AnnouncementCard = ({ title, description, date, isAdmin, onEdit, onDelete }: AnnouncementCardProps) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        position: 'relative',
        borderRadius: 4, 
        border: '1px solid #e0e4e8',
        background: '#fff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': { 
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          borderColor: 'primary.main'
        }
      }}
    >
      {/* Admin Actions Overlay */}
      {isAdmin && (
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={onEdit}
              sx={{ bgcolor: 'grey.50', '&:hover': { bgcolor: 'primary.50', color: 'primary.main' } }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              size="small" 
              onClick={onDelete}
              sx={{ bgcolor: 'grey.50', '&:hover': { bgcolor: 'error.50', color: 'error.main' } }}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}

      <CardContent sx={{ p: 4 }}>
        <Chip 
          label="Internal" 
          size="small" 
          sx={{ mb: 2, fontWeight: 700, bgcolor: '#f0f4f8', color: '#546e7a', borderRadius: 1 }} 
        />
        
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, pr: isAdmin ? 10 : 0 }}>
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
          {description}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ opacity: 0.7 }}>
          <CalendarMonth sx={{ fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {date || "Just now"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default AnnouncementCard;