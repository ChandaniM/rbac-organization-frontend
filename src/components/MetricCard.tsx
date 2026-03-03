import { Card, CardContent, Typography, Box } from '@mui/material';
import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  color?: 'primary' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
}

const colorMap = {
  primary: {
    bg: 'primary.50',
    text: 'primary.main',
    iconBg: 'primary.100',
  },
  success: {
    bg: 'success.50',
    text: 'success.main',
    iconBg: 'success.100',
  },
  warning: {
    bg: 'warning.50',
    text: 'warning.main',
    iconBg: 'warning.100',
  },
  error: {
    bg: 'error.50',
    text: 'error.main',
    iconBg: 'error.100',
  },
};

const MetricCard = ({
  title,
  value,
  color = 'primary',
  icon,
}: MetricCardProps) => {
  const colors = colorMap[color];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid #e0e4e8',
        background: '#fff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          borderColor: `${color}.main`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {title}
            </Typography>
            <Typography
              variant='h4'
              sx={{ fontWeight: 800, color: colors.text }}
            >
              {value.toLocaleString()}
            </Typography>
          </Box>
          {icon && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: colors.iconBg,
                color: colors.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
