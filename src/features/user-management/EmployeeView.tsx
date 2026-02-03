// import { useState } from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   TextField,
//   MenuItem,
//   InputAdornment,
//   Button,
//   Typography,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import EmployeeCard from "../../components/EmployeeCard";
// import AnnouncementCard from "../../components/announcementCard";
// import AssignReportingManagerDialog from "../../components/AssignReportingManagerDialog";
// import DynamicDialog from "../../components/DynamicDialog";
// import AddUserForm from "../../components/AddUserForm";

// interface EmployeeDirectoryProps {
//   isAdmin?: boolean;
// }

// const EmployeeView = ({ isAdmin = false }: EmployeeDirectoryProps) => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [openAddUser, setOpenAddUser] = useState(false);
//   const [openManagerDialog, setOpenManagerDialog] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const dummyEmployees = [
//     { id: "1", name: "Abhijeet Habe", jobTitle: "Associate Software Engineer", department: "Software Engineering", location: "Mumbai", email: "abhijeet.habe@company.com", phone: "+91 98765 43210", businessUnit: "Product Engineering", avatar: "" },
//     { id: "2", name: "Sneha Patil", jobTitle: "HR Executive", department: "Human Resources", location: "Pune", email: "sneha.patil@company.com", phone: "+91 91234 56789", businessUnit: "Corporate HR", avatar: "" },
//     { id: "3", name: "Rahul Sharma", jobTitle: "Senior Software Engineer", department: "Software Engineering", location: "Bangalore", email: "rahul.sharma@company.com", phone: "+91 99887 66554", businessUnit: "Platform Engineering", avatar: "" },
//     { id: "4", name: "Neha Verma", jobTitle: "Product Manager", department: "Product", location: "Remote", email: "neha.verma@company.com", phone: "+91 90909 80808", businessUnit: "Product Management", avatar: "" },
//     { id: "5", name: "Amit Kulkarni", jobTitle: "QA Engineer", department: "Quality Assurance", location: "Mumbai", email: "amit.kulkarni@company.com", phone: "+91 97654 32109", businessUnit: "Engineering", avatar: "" },
//   ];

//   const dummyAnnouncements = [
//     { id: "1", title: "Annual Meetup", description: "Company Annual Meetup on 15th Feb", date: "2026-02-15" },
//     { id: "2", title: "New HR Policies", description: "HR policies updated, please review", date: "2026-01-30" },
//     { id: "3", title: "Product Launch", description: "New product launch scheduled next month", date: "2026-03-01" },
//   ];

//   const filteredEmployees = dummyEmployees.filter((emp) =>
//     emp.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box p={3}>
//       {/* Admin Buttons */}
//       {isAdmin && (
//         <Box display="flex" justifyContent="space-between" mb={3} flexWrap="wrap" gap={2}>
//           <Button variant="contained" color="primary">Add Announcement</Button>
//           <Box display="flex" gap={2} flexWrap="wrap">
//             <Button variant="outlined" onClick={() => setOpenManagerDialog(true)}>Add Reporting Manager</Button>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "#10B981", "&:hover": { bgcolor: "#059669" } }}
//               onClick={() => setOpenAddUser(true)}
//             >
//               Add Employee
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* Tabs */}
//       <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
//         <Tab label="Employees" />
//         <Tab label="Documents" />
//         <Tab label="Announcements" />
//       </Tabs>

//       {/* Tab Panels */}
//       {tabIndex === 0 && (
//         <Box mt={2}>
//           {/* Filters and Search */}
//           <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1.5fr" }} gap={2} mb={3}>
//             <TextField select size="small" label="Department" fullWidth>
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="engineering">Engineering</MenuItem>
//               <MenuItem value="hr">HR</MenuItem>
//               <MenuItem value="sales">Sales</MenuItem>
//             </TextField>

//             <TextField select size="small" label="Location" fullWidth>
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="mumbai">Mumbai</MenuItem>
//               <MenuItem value="bangalore">Bangalore</MenuItem>
//               <MenuItem value="remote">Remote</MenuItem>
//             </TextField>

//             <TextField
//               size="small"
//               placeholder="Search employees"
//               fullWidth
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon fontSize="small" />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {/* Employee Cards */}
//           <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//             {filteredEmployees.map((emp) => (
//               <EmployeeCard key={emp.id} employee={emp} />
//             ))}
//           </div>
//         </Box>
//       )}

//       {tabIndex === 1 && (
//         <Box mt={2}>
//           <Typography variant="h6">Documents</Typography>
//           <Typography color="text.secondary">Here you can show all documents related content.</Typography>
//         </Box>
//       )}

//       {tabIndex === 2 && (
//         <Box mt={2}>
//           <Typography variant="h6">Announcements</Typography>
//           <Box className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-2">
//             {dummyAnnouncements.map((ann) => (
//               <AnnouncementCard
//                 key={ann.id}
//                 title={ann.title}
//                 description={ann.description}
//                 date={ann.date}
//               />
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* Admin Dialogs */}
//       {isAdmin && (
//         <>
//           <DynamicDialog
//             open={openAddUser}
//             header={{ title: "Add Employee", subtitle: "Create a new employee" }}
//             onClose={() => setOpenAddUser(false)}
//           >
//             <AddUserForm
//               onComplete={() => setOpenAddUser(false)}
//               onClose={() => setOpenAddUser(false)}
//             />
//           </DynamicDialog>

//           <AssignReportingManagerDialog
//             open={openManagerDialog}
//             onClose={() => setOpenManagerDialog(false)}
//             users={dummyEmployees}
//             onAssign={() => setOpenManagerDialog(false)}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default EmployeeView;

// import { useState } from "react";
// import {
//   Box, Tabs, Tab, TextField, MenuItem, InputAdornment,
//   Button, Typography, Stack, Container, Chip
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   AddCircleOutline as AddIcon,
//   SupervisorAccountOutlined as ManagerIcon,
//   CampaignOutlined as AnnouncementIcon
// } from "@mui/icons-material";
// import EmployeeCard from "../../components/EmployeeCard";

// export const EmployeeView = ({ isAdmin = true }) => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openAddUser, setOpenAddUser] = useState(false);
//   const [openManagerDialog, setOpenManagerDialog] = useState(false);

//   const dummyEmployees = [
//     { id: "1", name: "Abhijeet Habe", jobTitle: "Associate Software Engineer", department: "Software Engineering", location: "Mumbai", email: "abhijeet.habe@company.com", phone: "+91 98765 43210", businessUnit: "Product Engineering", avatar: "" },
//     { id: "2", name: "Sneha Patil", jobTitle: "HR Executive", department: "Human Resources", location: "Pune", email: "sneha.patil@company.com", phone: "+91 91234 56789", businessUnit: "Corporate HR", avatar: "" },
//     { id: "3", name: "Rahul Sharma", jobTitle: "Senior Software Engineer", department: "Software Engineering", location: "Bangalore", email: "rahul.sharma@company.com", phone: "+91 99887 66554", businessUnit: "Platform Engineering", avatar: "" },
//     { id: "4", name: "Neha Verma", jobTitle: "Product Manager", department: "Product", location: "Remote", email: "neha.verma@company.com", phone: "+91 90909 80808", businessUnit: "Product Management", avatar: "" },
//     { id: "5", name: "Amit Kulkarni", jobTitle: "QA Engineer", department: "Quality Assurance", location: "Mumbai", email: "amit.kulkarni@company.com", phone: "+91 97654 32109", businessUnit: "Engineering", avatar: "" },
//   ];

//   const dummyAnnouncements = [
//     { id: "1", title: "Annual Meetup", description: "Company Annual Meetup on 15th Feb", date: "2026-02-15" },
//     { id: "2", title: "New HR Policies", description: "HR policies updated, please review", date: "2026-01-30" },
//     { id: "3", title: "Product Launch", description: "New product launch scheduled next month", date: "2026-03-01" },
//   ];

//   // Logic for filtered view
//   const filteredEmployees = dummyEmployees.filter(emp =>
//     emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
//       <Container maxWidth="lg">

//         {/* HEADER SECTION */}
//         <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start" spacing={2} mb={4}>
//           <Box>
//             <Typography variant="h4" fontWeight="800" letterSpacing="-0.5px">
//               Organization Portal
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Welcome back. You have {dummyEmployees.length} team members active.
//             </Typography>
//           </Box>

//           {isAdmin && (
//             <Stack direction="row" spacing={1.5}>
//               <Button
//                 variant="outlined"
//                 startIcon={<ManagerIcon />}
//                 sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
//               >
//                 Assign Manager
//               </Button>
//               <Button
//                 variant="contained"
//                 disableElevation
//                 startIcon={tabIndex === 2 ? <AnnouncementIcon /> : <AddIcon />}
//                 sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3 }}
//               >
//                 {tabIndex === 2 ? "New Announcement" : "Add Employee"}
//               </Button>
//             </Stack>
//           )}
//         </Stack>

//         {/* TAB NAVIGATION */}
//         <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
//           <Tabs
//             value={tabIndex}
//             onChange={(_, v) => setTabIndex(v)}
//             sx={{
//               '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '1rem' }
//             }}
//           >
//             <Tab label="Directory" />
//             <Tab label="Resources" />
//             <Tab label="Announcements" icon={<Chip label="3" size="small" color="primary" sx={{ ml: 1, height: 20 }} />} iconPosition="end" />
//           </Tabs>
//         </Box>

//         {/* SEARCH & FILTERS */}
//         {tabIndex === 0 && (
//           <>
//             <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
//               <TextField
//                 placeholder="Search by name, role, or department..."
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
//                   sx: { borderRadius: 3, bgcolor: 'white' }
//                 }}
//               />
//               <Stack direction="row" spacing={2}>
//                 <TextField select size="medium" defaultValue="" sx={{ minWidth: 160, bgcolor: 'white', borderRadius: 3 }}>
//                   <MenuItem value="">All Departments</MenuItem>
//                   <MenuItem value="eng">Engineering</MenuItem>
//                 </TextField>
//                 <TextField select size="medium" defaultValue="" sx={{ minWidth: 140, bgcolor: 'white', borderRadius: 3 }}>
//                   <MenuItem value="">Location</MenuItem>
//                   <MenuItem value="remote">Remote</MenuItem>
//                 </TextField>
//               </Stack>
//             </Stack>

//             {/* EMPLOYEE GRID */}
//             <Box
//               display="grid"
//               gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
//               gap={3}
//             >
//               {filteredEmployees.map((emp) => (
//                 <EmployeeCard key={emp.id} employee={emp} />
//               ))}
//             </Box>
//           </>
//         )}

//         {/* ... Other Tab Contents */}
//       </Container>
//     </Box>
//   );
// };

// import { useState, useMemo, useEffect } from "react";
// import {
//   Box, Tabs, Tab, TextField, MenuItem, InputAdornment,
//   Button, Typography, Stack, Container, Chip, Divider,
//   CardActionArea,
//   Card,
//   Paper
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   AddCircleOutline as AddIcon,
//   SupervisorAccountOutlined as ManagerIcon,
//   Groups as GroupsIcon,
//   DescriptionOutlined as DocIcon,
//   CampaignOutlined as AnnouncementIcon,
//   SentimentDissatisfiedOutlined as NoDataIcon,
//   PictureAsPdfOutlined as PdfIcon,
//   CloudUploadOutlined as UploadIcon,
//   InsertDriveFileOutlined as FileIcon
// } from "@mui/icons-material";

// // Components
// import EmployeeCard from "../../components/EmployeeCard";
// import AnnouncementCard from "../../components/announcementCard";
// import AssignReportingManagerDialog from "../../components/AssignReportingManagerDialog";
// import DynamicDialog from "../../components/DynamicDialog";
// import AddUserForm from "../../components/AddUserForm";
// import type { S3Document } from "../../services/storage.service";
// import { StorageService } from "../../services/storage.service";
// import { useAuth } from "../../store/AuthContext";
// interface EmployeeViewProps {
//   isAdmin?: boolean;
// }

// const EmployeeView = ({ isAdmin = true }: EmployeeViewProps) => {
//   // --- STATE MANAGEMENT ---
//   const {tenantId , role , token } = useAuth();
//   const [tabIndex, setTabIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openAddUser, setOpenAddUser] = useState(false);
//   const [openManagerDialog, setOpenManagerDialog] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [documents, setDocuments] = useState<S3Document[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   // --- DATA ---
//   // const [documents, setDocuments] = useState([
//   //   { id: 1, name: "Employee_Handbook_2026.pdf", size: "2.4 MB", type: "pdf", date: "2026-01-10" },
//   //   { id: 2, name: "Health_Insurance_Policy.pdf", size: "1.1 MB", type: "pdf", date: "2026-01-15" },
//   //   { id: 3, name: "Holiday_Calendar.docx", size: "450 KB", type: "doc", date: "2026-01-20" },
//   // ]);
//   const dummyEmployees = [
//     { id: "1", name: "Abhijeet Habe", jobTitle: "Associate Software Engineer", department: "Software Engineering", location: "Mumbai", email: "abhijeet.habe@company.com", phone: "+91 98765 43210", businessUnit: "Product Engineering", avatar: "" },
//     { id: "2", name: "Sneha Patil", jobTitle: "HR Executive", department: "Human Resources", location: "Pune", email: "sneha.patil@company.com", phone: "+91 91234 56789", businessUnit: "Corporate HR", avatar: "" },
//     { id: "3", name: "Rahul Sharma", jobTitle: "Senior Software Engineer", department: "Software Engineering", location: "Bangalore", email: "rahul.sharma@company.com", phone: "+91 99887 66554", businessUnit: "Platform Engineering", avatar: "" },
//     { id: "4", name: "Neha Verma", jobTitle: "Product Manager", department: "Product", location: "Remote", email: "neha.verma@company.com", phone: "+91 90909 80808", businessUnit: "Product Management", avatar: "" },
//     { id: "5", name: "Amit Kulkarni", jobTitle: "QA Engineer", department: "Quality Assurance", location: "Mumbai", email: "amit.kulkarni@company.com", phone: "+91 97654 32109", businessUnit: "Engineering", avatar: "" },
//   ];

//   const dummyAnnouncements = [
//     { id: "1", title: "Annual Meetup", description: "Company Annual Meetup on 15th Feb", date: "2026-02-15" },
//     { id: "2", title: "New HR Policies", description: "HR policies updated, please review", date: "2026-01-30" },
//   ];
// // --- FETCH DATA ---
//   const loadDocuments = async () => {
//     try {
//       const data = await StorageService.getDocuments(tenantId, role , token);
//       setDocuments(data);
//     } catch (error) {
//       console.error("Failed to load documents from LocalStack", error);
//     }
//   };
// // Load documents when the user switches to the Resources tab
//   useEffect(() => {
//     if (tabIndex === 1) {
//       loadDocuments();
//     }
//   }, [tabIndex]);

//   // --- FILTER LOGIC ---
//   const filteredEmployees = useMemo(() => {
//     return dummyEmployees.filter((emp) =>
//       emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [searchQuery]);

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       // Logic to handle actual files would go here
//       mockUpload(e.dataTransfer.files[0].name ,  e.dataTransfer.files);
//     }
//   };
//   const mockUpload = (fileName: string , file:any) => {
//     handleFileUpload(file)
//     // console.log(fileName , file , "this id")
//     // const newDoc = {
//     //   id: Date.now(),
//     //   name: fileName,
//     //   size: "Unknown Size",
//     //   type: fileName.split('.').pop() || 'file',
//     //   date: new Date().toISOString().split('T')[0]
//     // };
//     // setDocuments([newDoc, ...documents]);
//   };
//   const handleFileUpload = async (file: File) => {
//     try {
//       setIsUploading(true);
//       await StorageService.uploadDocument(file, tenantId, role);
//       await loadDocuments(); // Refresh list
//     } catch (error) {
//       alert("Upload failed. Ensure LocalStack and Backend are running.");
//     } finally {
//       setIsUploading(false);
//     }
//   };
//   return (
//     <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pb: 8 }}>
//       <Container maxWidth="lg">

//         {/* TOP ACTION BAR */}
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ py: 4 }}
//           spacing={2}
//         >
//           <Box>
//             <Typography variant="h4" fontWeight="800" color="text.primary" gutterBottom>
//               Organization Portal
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Welcome back. You have <strong>{dummyEmployees.length}</strong> active team members.
//             </Typography>
//           </Box>

//           {isAdmin && (
//             <Stack direction="row" spacing={2}>
//               <Button
//                 variant="outlined"
//                 startIcon={<ManagerIcon />}
//                 onClick={() => setOpenManagerDialog(true)}
//                 sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: 'white' }}
//               >
//                 Assign Manager
//               </Button>
//               <Button
//                 variant="contained"
//                 disableElevation
//                 startIcon={<AddIcon />}
//                 onClick={() => setOpenAddUser(true)}
//                 sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3 }}
//               >
//                 Add Employee
//               </Button>
//             </Stack>
//           )}
//         </Stack>

//         {/* NAVIGATION TABS */}
//         <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
//           <Tabs
//             value={tabIndex}
//             onChange={(_, v) => setTabIndex(v)}
//             sx={{ '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', minWidth: 120 } }}
//           >
//             <Tab icon={<GroupsIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Directory" />
//             <Tab icon={<DocIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Resources" />
//             <Tab
//               icon={<Chip label={dummyAnnouncements.length} size="small" color="primary" sx={{ height: 18, fontSize: 10 }} />}
//               iconPosition="end"
//               label="Announcements"
//             />
//           </Tabs>
//         </Box>

//         {/* --- DIRECTORY TAB CONTENT --- */}
//         {tabIndex === 0 && (
//           <>
//             {/* FILTER STRIP */}
//             <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={4}>
//               <TextField
//                 placeholder="Search by name, role, or department..."
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
//                   sx: { borderRadius: 3, bgcolor: 'white' }
//                 }}
//               />
//               <Stack direction="row" spacing={2}>
//                 <TextField select defaultValue="" size="medium" sx={{ minWidth: 160, bgcolor: 'white', borderRadius: 3 }}>
//                   <MenuItem value="">All Departments</MenuItem>
//                   <MenuItem value="eng">Engineering</MenuItem>
//                 </TextField>
//                 <TextField select defaultValue="" size="medium" sx={{ minWidth: 140, bgcolor: 'white', borderRadius: 3 }}>
//                   <MenuItem value="">Location</MenuItem>
//                   <MenuItem value="remote">Remote</MenuItem>
//                 </TextField>
//               </Stack>
//             </Stack>

//             {/* RESULTS GRID */}
//             {filteredEmployees.length > 0 ? (
//               <Box
//                 display="grid"
//                 gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
//                 gap={3}
//               >
//                 {filteredEmployees.map((emp) => (
//                   <EmployeeCard key={emp.id} employee={emp} />
//                 ))}
//               </Box>
//             ) : (
//               <Stack alignItems="center" justifyContent="center" py={10} spacing={2} sx={{ opacity: 0.6 }}>
//                 <NoDataIcon sx={{ fontSize: 60 }} />
//                 <Typography variant="h6">No employees match your search</Typography>
//               </Stack>
//             )}
//           </>
//         )}
//         {tabIndex === 1 && (
//           <>
//             <Paper
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//               elevation={0}
//               sx={{
//                 p: 5,
//                 mb: 4,
//                 textAlign: 'center',
//                 borderRadius: 4,
//                 border: '2px dashed',
//                 borderColor: dragActive ? 'primary.main' : 'divider',
//                 bgcolor: dragActive ? 'primary.50' : 'white',
//                 transition: 'all 0.2s ease-in-out',
//                 cursor: 'pointer',
//                 position: 'relative'
//               }}
//             >
//               <input
//                 type="file"
//                 id="file-upload"
//                 multiple
//                 style={{ display: 'none' }}
//                 onChange={(e) => e.target.files && mockUpload(e.target.files[0].name , e.target.files)}
//               />
//               <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
//                 <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
//                 <Typography variant="h6" fontWeight="700">
//                   Click to upload or drag and drop
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   PDF, DOCX, or PNG (max. 10MB)
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   component="span"
//                   sx={{ mt: 3, borderRadius: 2, textTransform: 'none', px: 4 }}
//                 >
//                   Select Files
//                 </Button>
//               </label>
//             </Paper>
//                    <Box>
//             <Typography variant="h6" fontWeight="700" mb={3}>Company Resources</Typography>
//             <Box
//               display="grid"
//               gridTemplateColumns={{ xs: "1fr", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
//               gap={3}
//             >
//               {documents.map((doc) => (
//                 <Card
//                   key={doc.id}
//                   elevation={0}
//                   sx={{
//                     borderRadius: 3,
//                     border: '1px solid',
//                     borderColor: 'divider',
//                     '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
//                   }}
//                 >
//                   <CardActionArea sx={{ p: 3, textAlign: 'center' }}>
//                     {doc.type === 'pdf' ?
//                       <PdfIcon sx={{ fontSize: 48, color: '#ef4444', mb: 1 }} /> :
//                       <FileIcon sx={{ fontSize: 48, color: '#3b82f6', mb: 1 }} />
//                     }
//                     <Typography variant="subtitle2" noWrap fontWeight="600">
//                       {doc.name}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {doc.size} • {doc.date}
//                     </Typography>
//                   </CardActionArea>
//                 </Card>
//               ))}
//             </Box>
//           </Box>
//           </>
//         )}
//         {/* --- ANNOUNCEMENTS TAB --- */}
//         {tabIndex === 2 && (
//           <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
//             {dummyAnnouncements.map((ann) => (
//               <AnnouncementCard key={ann.id} {...ann} />
//             ))}
//           </Box>
//         )}
//       </Container>

//       {/* --- HIDDEN DIALOGS (ADMIN ONLY) --- */}
//       {isAdmin && (
//         <>
//           <DynamicDialog
//             open={openAddUser}
//             header={{ title: "Add New Employee", subtitle: "Enter profile details to add a member." }}
//             onClose={() => setOpenAddUser(false)}
//           >
//             <AddUserForm onComplete={() => setOpenAddUser(false)} onClose={() => setOpenAddUser(false)} />
//           </DynamicDialog>

//           <AssignReportingManagerDialog
//             open={openManagerDialog}
//             onClose={() => setOpenManagerDialog(false)}
//             users={dummyEmployees}
//             onAssign={() => setOpenManagerDialog(false)}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default  EmployeeView ;

// import { useState, useMemo, useEffect } from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   TextField,
//   MenuItem,
//   InputAdornment,
//   Button,
//   Typography,
//   Stack,
//   Container,
//   Chip,
//   CardActionArea,
//   Card,
//   Paper,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   AddCircleOutline as AddIcon,
//   SupervisorAccountOutlined as ManagerIcon,
//   Groups as GroupsIcon,
//   DescriptionOutlined as DocIcon,
//   CampaignOutlined as AnnouncementIcon,
//   SentimentDissatisfiedOutlined as NoDataIcon,
//   PictureAsPdfOutlined as PdfIcon,
//   CloudUploadOutlined as UploadIcon,
//   InsertDriveFileOutlined as FileIcon,
// } from "@mui/icons-material";

// // Components
// import EmployeeCard from "../../components/EmployeeCard";
// import AnnouncementCard from "../../components/announcementCard";
// import AssignReportingManagerDialog from "../../components/AssignReportingManagerDialog";
// import DynamicDialog from "../../components/DynamicDialog";
// import AddUserForm from "../../components/AddUserForm";

// // Services / Types
// import type { S3Document } from "../../services/storage.service";
// import { StorageService } from "../../services/storage.service";
// import { useAuth } from "../../store/AuthContext";

// interface EmployeeViewProps {
//   isAdmin?: boolean;
// }

// const EmployeeView = ({ isAdmin = true }: EmployeeViewProps) => {
//   const { tenantId, role, token } = useAuth();

//   const [tabIndex, setTabIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openAddUser, setOpenAddUser] = useState(false);
//   const [openManagerDialog, setOpenManagerDialog] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [documents, setDocuments] = useState<S3Document[]>([]);
//   const [isUploading, setIsUploading] = useState(false);

//   /* ------------------ MOCK DATA ------------------ */

//   const dummyEmployees = [
//     { id: "1", name: "Abhijeet Habe", jobTitle: "Associate Software Engineer", department: "Software Engineering", location: "Mumbai", email: "abhijeet.habe@company.com", phone: "+91 98765 43210", businessUnit: "Product Engineering", avatar: "" },
//     { id: "2", name: "Sneha Patil", jobTitle: "HR Executive", department: "Human Resources", location: "Pune", email: "sneha.patil@company.com", phone: "+91 91234 56789", businessUnit: "Corporate HR", avatar: "" },
//     { id: "3", name: "Rahul Sharma", jobTitle: "Senior Software Engineer", department: "Software Engineering", location: "Bangalore", email: "rahul.sharma@company.com", phone: "+91 99887 66554", businessUnit: "Platform Engineering", avatar: "" },
//     { id: "4", name: "Neha Verma", jobTitle: "Product Manager", department: "Product", location: "Remote", email: "neha.verma@company.com", phone: "+91 90909 80808", businessUnit: "Product Management", avatar: "" },
//     { id: "5", name: "Amit Kulkarni", jobTitle: "QA Engineer", department: "Quality Assurance", location: "Mumbai", email: "amit.kulkarni@company.com", phone: "+91 97654 32109", businessUnit: "Engineering", avatar: "" },
//   ];

//   const dummyAnnouncements = [
//     { id: "1", title: "Annual Meetup", description: "Company Annual Meetup on 15th Feb", date: "2026-02-15" },
//     { id: "2", title: "New HR Policies", description: "HR policies updated, please review", date: "2026-01-30" },
//   ];

//   /* ------------------ API ------------------ */

//   const loadDocuments = async () => {
//     try {
//       const data = await StorageService.getDocuments(tenantId, role, token);
//       setDocuments(data);
//     } catch (err) {
//       console.error("Failed to load documents", err);
//     }
//   };

//   useEffect(() => {
//     if (tabIndex === 1) {
//       loadDocuments();
//     }
//   }, [tabIndex]);

//   /* ------------------ FILTERS ------------------ */

//   const filteredEmployees = useMemo(() => {
//     return dummyEmployees.filter(
//       (emp) =>
//         emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [searchQuery]);

//   /* ------------------ FILE UPLOAD ------------------ */

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === "dragenter" || e.type === "dragover");
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files?.length) {
//       uploadFiles(e.dataTransfer.files);
//     }
//   };

//   const uploadFiles = async (files: FileList) => {
//     try {
//       setIsUploading(true);
//       for (const file of Array.from(files)) {
//         await StorageService.uploadDocument(file, tenantId, role);
//       }
//       await loadDocuments();
//     } catch {
//       alert("Upload failed. Ensure backend & LocalStack are running.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   /* ------------------ RENDER ------------------ */

//   return (
//     <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pb: 8 }}>
//       <Container maxWidth="lg">

//         {/* HEADER */}
//         <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" py={4} spacing={2}>
//           <Box>
//             <Typography variant="h4" fontWeight={800}>Organization Portal</Typography>
//             <Typography color="text.secondary">
//               Welcome back. You have <strong>{dummyEmployees.length}</strong> team members.
//             </Typography>
//           </Box>

//           {isAdmin && (
//             <Stack direction="row" spacing={2}>
//               <Button variant="outlined" startIcon={<ManagerIcon />} onClick={() => setOpenManagerDialog(true)}>
//                 Assign Manager
//               </Button>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddUser(true)}>
//                 Add Employee
//               </Button>
//             </Stack>
//           )}
//         </Stack>

//         {/* TABS */}
//         <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
//           <Tab icon={<GroupsIcon />} label="Directory" />
//           <Tab icon={<DocIcon />} label="Resources" />
//           <Tab label="Announcements" icon={<Chip label={dummyAnnouncements.length} size="small" />} iconPosition="end" />
//         </Tabs>

//         {/* DIRECTORY */}
//         {tabIndex === 0 && (
//           <>
//             <TextField
//               fullWidth
//               placeholder="Search employees..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//               sx={{ my: 3, bgcolor: "white", borderRadius: 2 }}
//             />

//             {filteredEmployees.length ? (
//               <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(3,1fr)" }} gap={3}>
//                 {filteredEmployees.map(emp => <EmployeeCard key={emp.id} employee={emp} />)}
//               </Box>
//             ) : (
//               <Stack alignItems="center" py={8}>
//                 <NoDataIcon fontSize="large" />
//                 <Typography>No employees found</Typography>
//               </Stack>
//             )}
//           </>
//         )}

//         {/* RESOURCES */}
//         {tabIndex === 1 && (
//           <>
//             <Paper
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//               sx={{ p: 4, my: 4, textAlign: "center", border: "2px dashed", borderColor: dragActive ? "primary.main" : "divider" }}
//             >
//               <input hidden multiple type="file" id="upload" onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
//               <label htmlFor="upload">
//                 <UploadIcon fontSize="large" color="primary" />
//                 <Typography>Click or drag files to upload</Typography>
//                 <Button variant="contained" component="span" disabled={isUploading}>
//                   {isUploading ? "Uploading..." : "Select Files"}
//                 </Button>
//               </label>
//             </Paper>

//             <Box display="grid" gridTemplateColumns="repeat(auto-fill,minmax(180px,1fr))" gap={2}>
//               {documents.map(doc => (
//                 <Card key={doc.id} variant="outlined">
//                   <CardActionArea sx={{ p: 2, textAlign: "center" }}>
//                     {doc.type === "pdf" ? <PdfIcon color="error" /> : <FileIcon />}
//                     <Typography variant="body2" noWrap>{doc.name}</Typography>
//                     <Typography variant="caption">{doc.size} • {doc.date}</Typography>
//                   </CardActionArea>
//                 </Card>
//               ))}
//             </Box>
//           </>
//         )}

//         {/* ANNOUNCEMENTS */}
//         {tabIndex === 2 && (
//           <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2,1fr)" }} gap={3} mt={3}>
//             {dummyAnnouncements.map(a => <AnnouncementCard key={a.id} {...a} />)}
//           </Box>
//         )}
//       </Container>

//       {/* DIALOGS */}
//       {isAdmin && (
//         <>
//           <DynamicDialog open={openAddUser} onClose={() => setOpenAddUser(false)} header={{ title: "Add Employee" }}>
//             <AddUserForm onClose={() => setOpenAddUser(false)} onComplete={() => setOpenAddUser(false)} />
//           </DynamicDialog>

//           <AssignReportingManagerDialog
//             open={openManagerDialog}
//             onClose={() => setOpenManagerDialog(false)}
//             users={dummyEmployees}
//             onAssign={() => setOpenManagerDialog(false)}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default EmployeeView;
import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Stack,
  Container,
  Chip,
  Card,
  Paper,
  Grid,
  Divider,
  Fade,
  Avatar,
  CardActionArea,
  LinearProgress,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  SupervisorAccountOutlined as ManagerIcon,
  GroupsOutlined as GroupsIcon,
  DescriptionOutlined as DocIcon,
  CampaignOutlined as AnnouncementIcon,
  SentimentDissatisfiedOutlined as NoDataIcon,
  PictureAsPdfOutlined as PdfIcon,
  CloudUploadOutlined as UploadIcon,
  InsertDriveFileOutlined as FileIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Components
import EmployeeCard from "../../components/EmployeeCard";
import AnnouncementCard from "../../components/AnnouncementCard";
import AssignReportingManagerDialog from "../../components/AssignReportingManagerDialog";
import DynamicDialog from "../../components/DynamicDialog";
import AddUserForm from "../../components/AddUserForm";

// Services / Types
import type { S3Document } from "../../services/storage.service";
import { StorageService } from "../../services/storage.service";
import { useAuth } from "../../store/AuthContext";

interface EmployeeViewProps {
  isAdmin?: boolean;
}

const EmployeeView = ({ isAdmin = true }: EmployeeViewProps) => {
  const { tenantId, role, token } = useAuth();

  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openManagerDialog, setOpenManagerDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [documents, setDocuments] = useState<S3Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  /* ------------------ MOCK DATA (Unchanged) ------------------ */
  const dummyEmployees = [
    {
      id: "1",
      name: "Abhijeet Habe",
      jobTitle: "Associate Software Engineer",
      department: "Software Engineering",
      location: "Mumbai",
      email: "abhijeet.habe@company.com",
      phone: "+91 98765 43210",
      businessUnit: "Product Engineering",
      avatar: "",
    },
    {
      id: "2",
      name: "Sneha Patil",
      jobTitle: "HR Executive",
      department: "Human Resources",
      location: "Pune",
      email: "sneha.patil@company.com",
      phone: "+91 91234 56789",
      businessUnit: "Corporate HR",
      avatar: "",
    },
    {
      id: "3",
      name: "Rahul Sharma",
      jobTitle: "Senior Software Engineer",
      department: "Software Engineering",
      location: "Bangalore",
      email: "rahul.sharma@company.com",
      phone: "+91 99887 66554",
      businessUnit: "Platform Engineering",
      avatar: "",
    },
    {
      id: "4",
      name: "Neha Verma",
      jobTitle: "Product Manager",
      department: "Product",
      location: "Remote",
      email: "neha.verma@company.com",
      phone: "+91 90909 80808",
      businessUnit: "Product Management",
      avatar: "",
    },
    {
      id: "5",
      name: "Amit Kulkarni",
      jobTitle: "QA Engineer",
      department: "Quality Assurance",
      location: "Mumbai",
      email: "amit.kulkarni@company.com",
      phone: "+91 97654 32109",
      businessUnit: "Engineering",
      avatar: "",
    },
  ];

  const dummyAnnouncements = [
    {
      id: "1",
      title: "Annual Meetup",
      description: "Company Annual Meetup on 15th Feb",
      date: "2026-02-15",
    },
    {
      id: "2",
      title: "New HR Policies",
      description: "HR policies updated, please review",
      date: "2026-01-30",
    },
  ];

  /* ------------------ API / LOGIC (Unchanged) ------------------ */
  const loadDocuments = async () => {
    try {
      const data = await StorageService.getDocuments(tenantId, role, token);
      setDocuments(data);
    } catch (err) {
      console.error("Failed to load documents", err);
    }
  };

  useEffect(() => {
    if (tabIndex === 1) loadDocuments();
  }, [tabIndex]);

  const filteredEmployees = useMemo(() => {
    return dummyEmployees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  const uploadFiles = async (files: FileList) => {
    try {
      setIsUploading(true);
      for (const file of Array.from(files)) {
        await StorageService.uploadDocument(file, tenantId, role, token);
      }
      await loadDocuments();
    } catch {
      alert("Upload failed. Ensure backend & LocalStack are running.");
    } finally {
      setIsUploading(false);
    }
  };
  const handleDownload = async (doc: S3Document) => {
    if (!tenantId || !role || !token) {
      alert("Authentication context missing. Please re-login.");
      return;
    }

    try {
      const url = await StorageService.downloadDocument(
        tenantId,
        role,
        doc.key,
        token
      );

      window.open(url, "_blank");
    } catch (error) {
      console.error("Download failed", error);
      alert("Failed to download file");
    }
  };

  const handleDelete = async (doc: S3Document) => {
    if (!tenantId || !role || !token) {
      alert("Authentication context missing.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${doc.name}"?`
    );
    if (!confirmed) return;

    try {
      await StorageService.deleteDocument(tenantId, role, doc.key, token);

      setDocuments((prev) => prev.filter((d: any) => d.key !== doc.key));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete file");
    }
  };
  const handleAddAnnouncement = ()=>{
    console.log("Announcement");
    
  }
  /* ------------------ RENDER ------------------ */
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* 1. HERO HEADER SECTION */}
      <Paper
        elevation={0}
        sx={{ borderBottom: "1px solid", borderColor: "divider", pt: 5, pb: 0 }}
      >
        <Container maxWidth='xl'>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent='space-between'
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 800,
                  color: "#1E293B",
                  letterSpacing: "-0.5px",
                }}
              >
                Organization Portal
              </Typography>
              <Typography
                variant='body1'
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                You have{" "}
                <Box
                  component='span'
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  {dummyEmployees.length}
                </Box>{" "}
                team members in your directory.
              </Typography>
            </Box>

            {isAdmin && (
              <Stack direction='row' spacing={1.5}>
                <Button
                  variant='outlined'
                  startIcon={<ManagerIcon />}
                  onClick={() => setOpenManagerDialog(true)}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                  }}
                >
                  Assign Manager
                </Button>
                <Button
                  variant='contained'
                  disableElevation
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddUser(true)}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                  }}
                >
                  Add Employee
                </Button>
              </Stack>
            )}
          </Stack>

          {/* REFINED TABS */}
          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            sx={{
              "& .MuiTab-root": {
                minHeight: 60,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
              },
              "& .Mui-selected": { color: "primary.main" },
            }}
          >
            <Tab icon={<GroupsIcon />} iconPosition='start' label='Directory' />
            <Tab icon={<DocIcon />} iconPosition='start' label='Resources' />
            <Tab
              icon={<AnnouncementIcon />}
              iconPosition='start'
              label={
                <Stack direction='row' spacing={1} alignItems='center'>
                  <span>Announcements</span>
                  <Chip
                    label={dummyAnnouncements.length}
                    size='small'
                    color='primary'
                    sx={{ height: 20, fontSize: "0.7rem", fontWeight: 700 }}
                  />
                </Stack>
              }
            />
          </Tabs>
        </Container>
      </Paper>

      {/* 2. MAIN CONTENT AREA */}
      <Container maxWidth='xl' sx={{ py: 4 }}>
        {/* DIRECTORY TAB */}
        {tabIndex === 0 && (
          <Fade in={tabIndex === 0} timeout={400}>
            <Box>
              <Stack direction='row' spacing={2} sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  placeholder='Search by name, role or department...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon color='disabled' />
                      </InputAdornment>
                    ),
                    sx: { bgcolor: "white", borderRadius: 3 },
                  }}
                />
                <Stack direction='row' spacing={2}>
                  <TextField
                    select
                    defaultValue=''
                    size='medium'
                    SelectProps={{
                      displayEmpty: true,
                    }}
                    sx={{ minWidth: 160, bgcolor: "white", borderRadius: 3 }}
                  >
                    <MenuItem value='' disabled>
                      <em>Select Department</em>
                    </MenuItem>
                    <MenuItem value='eng'>Engineering</MenuItem>
                  </TextField>

                  <TextField
                    select
                    defaultValue=''
                    size='medium'
                    SelectProps={{
                      displayEmpty: true,
                    }}
                    sx={{ minWidth: 140, bgcolor: "white", borderRadius: 3 }}
                  >
                    <MenuItem value='' disabled>
                      <em>Location</em>
                    </MenuItem>
                    <MenuItem value='remote'>Remote</MenuItem>
                  </TextField>
                </Stack>
              </Stack>

              <div
                className='grid gap-[32px]'
                style={{ gridTemplateColumns: "auto auto auto" }}
              >
                {filteredEmployees.length ? (
                  filteredEmployees.map((emp) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={emp.id}>
                      <EmployeeCard employee={emp} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      py={12}
                      sx={{ color: "text.disabled" }}
                    >
                      <NoDataIcon sx={{ fontSize: 64, mb: 2 }} />
                      <Typography variant='h6'>
                        No employees found matching your search
                      </Typography>
                    </Stack>
                  </Grid>
                )}
              </div>
            </Box>
          </Fade>
        )}

        {/* RESOURCES TAB */}
        {tabIndex === 1 && (
          <Fade in={tabIndex === 1} timeout={400}>
            <Box>
              <Paper
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                elevation={0}
                sx={{
                  p: 6,
                  mb: 4,
                  textAlign: "center",
                  border: "2px dashed",
                  borderColor: dragActive ? "primary.main" : "divider",
                  bgcolor: dragActive ? "primary.50" : "white",
                  borderRadius: 4,
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  hidden
                  multiple
                  type='file'
                  id='upload'
                  onChange={(e) =>
                    e.target.files && uploadFiles(e.target.files)
                  }
                />
                <label htmlFor='upload'>
                  <UploadIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>
                    Upload Team Resources
                  </Typography>
                  <Typography color='text.secondary' sx={{ mb: 3 }}>
                    Drag and drop your files here or click to browse
                  </Typography>
                  <Button
                    variant='contained'
                    component='span'
                    disabled={isUploading}
                    disableElevation
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    {isUploading ? "Uploading..." : "Select Files"}
                  </Button>
                </label>
                {isUploading && (
                  <LinearProgress sx={{ mt: 4, borderRadius: 1 }} />
                )}
              </Paper>

              <Grid container spacing={2}>
                {documents.map((doc) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id}>
                    <Card
                      variant='outlined'
                      sx={{
                        borderRadius: 3,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "16px",
                          gap: "12px",
                        }}
                      >
                        {/* FILE ICON */}
                        <Avatar
                          sx={{
                            bgcolor: doc.type === "pdf" ? "#FEE2E2" : "#E0E7FF",
                            borderRadius: 2,
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                          }}
                        >
                          {doc.type === "pdf" ? (
                            <PdfIcon sx={{ color: "#EF4444" }} />
                          ) : (
                            <FileIcon sx={{ color: "#4F46E5" }} />
                          )}
                        </Avatar>

                        {/* FILE META */}
                        <div
                          style={{
                            flex: 1,
                            minWidth: 0, // 🔑 prevents overlap
                          }}
                        >
                          <Typography
                            variant='body2'
                            sx={{
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {doc.name}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {doc.size} • {doc.date}
                          </Typography>
                        </div>

                        {/* ACTIONS */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            flexShrink: 0,
                          }}
                        >
                          <IconButton
                            size='small'
                            onClick={() => handleDownload(doc)}
                            aria-label='Download file'
                          >
                            <DownloadOutlinedIcon fontSize='small' />
                          </IconButton>

                          <IconButton
                            size='small'
                            color='error'
                            onClick={() => handleDelete(doc)}
                            aria-label='Delete file'
                          >
                            <DeleteOutlineOutlinedIcon fontSize='small' />
                          </IconButton>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {tabIndex === 2 && (
          <>
            {isAdmin && <button type="button" onClick={handleAddAnnouncement}>Add Announcement</button>}

            <Fade in={tabIndex === 2} timeout={400}>
              <Grid container spacing={3}>
                {dummyAnnouncements.map((a) => (
                  <Grid item xs={12} md={6} key={a.id}>
                    <AnnouncementCard {...a} />
                  </Grid>
                ))}
              </Grid>
            </Fade>
          </>
        )}
      </Container>

      {/* 3. DIALOGS */}
      {isAdmin && (
        <>
          <DynamicDialog
            open={openAddUser}
            onClose={() => setOpenAddUser(false)}
            header={{ title: "Add New Employee" }}
          >
            <AddUserForm
              onClose={() => setOpenAddUser(false)}
              onComplete={() => setOpenAddUser(false)}
            />
          </DynamicDialog>

          <AssignReportingManagerDialog
            open={openManagerDialog}
            onClose={() => setOpenManagerDialog(false)}
            users={dummyEmployees}
            onAssign={() => setOpenManagerDialog(false)}
          />
        </>
      )}
    </Box>
  );
};

export default EmployeeView;
