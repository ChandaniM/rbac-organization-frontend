// import { Card,CardContent,Avatar,Typography,Box,Divider} from "@mui/material";

// export interface Employee {
//   id: string;
//   name: string;
//   jobTitle: string;
//   department: string;
//   location: string;
//   email: string;
//   phone: string;
//   businessUnit: string;
//   avatar?: string;
// }

// interface Props {
//   employee: Employee;
// }

// const EmployeeCard = ({ employee }: Props) => {
//   return (
//     <Card
//       sx={{
//         borderRadius: 2,
//         boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
//         height: "100%",
//         width:"100%"
//       }}
//     >
//       <CardContent>
//         {/* Header */}
//         <Box display='flex' gap={2} alignItems='center' mb={2}>
//           <Avatar src={employee.avatar} sx={{ width: 56, height: 56 }} />
//           <Box>
//             <Typography fontWeight={600}>{employee.name}</Typography>
//             <Typography variant='body2' color='text.secondary'>
//               {employee.jobTitle}
//             </Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 2 }} />

//         {/* Details */}
//         <Box display='grid' gridTemplateColumns='1fr' rowGap={1}>
//           <Typography variant='body2'>
//             <strong>Department:</strong> {employee.department}
//           </Typography>

//           <Typography variant='body2'>
//             <strong>Location:</strong> {employee.location}
//           </Typography>

//           <Typography variant='body2'>
//             <strong>Email:</strong> {employee.email}
//           </Typography>

//           <Typography variant='body2'>
//             <strong>Phone:</strong> {employee.phone}
//           </Typography>

//           <Typography variant='body2'>
//             <strong>Business Unit:</strong> {employee.businessUnit}
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default EmployeeCard;
import { Card, CardContent, Avatar, Typography, Stack, Divider, Box, IconButton, Tooltip } from "@mui/material";
import { 
  MailOutline, 
  PhoneAndroid, 
  LocationOnOutlined, 
  BusinessCenterOutlined,
  EditOutlined,
  DeleteOutline
} from "@mui/icons-material";

const EmployeeCard = ({
  employee,
  canManage = false,
  onEdit,
  onDelete,
}: {
  employee: any;
  canManage?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 3, 
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
          borderColor: 'primary.light'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar 
              src={employee.avatar} 
              sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: '1.2rem' }}
            >
              {employee.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="700" lineHeight={1.2}>
                {employee.name}
              </Typography>
              <Typography variant="body2" color="primary" fontWeight="500">
                {employee.jobTitle}
              </Typography>
            </Box>
          </Stack>
          {canManage ? (
            <Stack direction="row" spacing={0.5}>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={onEdit} aria-label="Edit employee">
                  <EditOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small" color="error" onClick={onDelete} aria-label="Delete employee">
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : null}
        </Stack>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <BusinessCenterOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {employee.department} • {employee.businessUnit}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">{employee.location}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <MailOutline sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {employee.email}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneAndroid sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.primary">{employee.phone}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;