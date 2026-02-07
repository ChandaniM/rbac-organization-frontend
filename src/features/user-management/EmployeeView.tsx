import { useState, useMemo, useEffect } from "react";
import {  Add,  Edit, DeleteOutline, CalendarMonth,   Campaign  } from '@mui/icons-material';
import { Box, Tabs, Tab, TextField, InputAdornment, Button, Typography,  Stack, Container, Chip, Card, Paper, Grid,  Divider, Fade, Avatar, CardActionArea, LinearProgress,  MenuItem,
} from "@mui/material";
import {  
  Search as SearchIcon, Add as AddIcon,  SupervisorAccountOutlined as ManagerIcon,
  GroupsOutlined as GroupsIcon, DescriptionOutlined as DocIcon, CampaignOutlined as AnnouncementIcon,  SentimentDissatisfiedOutlined as NoDataIcon,
  PictureAsPdfOutlined as PdfIcon,  CloudUploadOutlined as UploadIcon,
  InsertDriveFileOutlined as FileIcon, FilterList as FilterIcon,
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
import AddAnnouncementForm from "../../components/AddAnnouncementForm";

interface Announcement {
    id?: string,
    title: string,
    description: string,
    date: string,
}

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
  const [openAddAnnouncement, setOpenAddAnnouncement] = useState(false);
  const [dataAnnouncements , setdataAnnouncements] = useState<Array<Announcement>>([]);
  const [selectedAnnouncement , setselectedAnnouncement] = useState<Announcement>();
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
  const handleEditAnnouncement = (id: string | number) => {
    console.log("Edit announcement with ID:", id);
    // Future: setEditData(announcement); setOpenModal(true);
  };
  
  const handleDeleteAnnouncement = (id: string | number) => {
    const confirmed = window.confirm("Are you sure you want to delete this announcement?");
    if (confirmed) {
      console.log("Deleting announcement with ID:", id);
      // Future: await api.delete(`/announcements/${id}`);
    }
  };

  const handleAddAnnouncement = ()=>{
    setOpenAddAnnouncement(true);
    console.log("Announcement");
    
  }

  const handleAnnouncementSubmit = (data:Announcement)=>{
    console.log(data , "lol its new handleAnnouncementSubmit")
    setOpenAddAnnouncement(false)
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
                    label={dataAnnouncements.length}
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
  <Fade in={tabIndex === 2} timeout={400}>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      
      {/* PASTE THE BOX CODE HERE - THIS IS YOUR HEADER */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 6, 
        p: 3, 
        borderRadius: 4, 
        background: 'rgba(255, 255, 255, 0.6)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)'
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', letterSpacing: '-1px' }}>
            Announcements
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and broadcast updates to the organization.
          </Typography>
        </Box>

        {isAdmin && (
        <Button
        variant="contained"
        onClick={handleAddAnnouncement}
        startIcon={<Add />}  
        sx={{ 
          borderRadius: '12px', 
          textTransform: 'none', 
          fontWeight: 700,
        }}
      >
        Create New
      </Button>
        )}
      </Box>

      {/* THEN YOUR GRID STARTS BELOW IT */}
      <Grid container spacing={3}>
            {dataAnnouncements.length === 0 && (
        <Typography color="text.secondary">
          No announcements yet. Create one to get started.
        </Typography>
      )}

        {dataAnnouncements.length > 0 && dataAnnouncements.map((a) => (
          <Grid item xs={12} md={6} key={a.id}>
            <AnnouncementCard 
               {...a} 
               isAdmin={isAdmin} 
               onEdit={() => handleEditAnnouncement(a.id)}
               onDelete={() => handleDeleteAnnouncement(a.id)}
            />
          </Grid>
        ))}
      </Grid>

    </Container>
  </Fade>
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

      {isAdmin && (
        <DynamicDialog
          open={openAddAnnouncement}
          onClose={() => setOpenAddAnnouncement(false)}
          header={{ title: "Add Announcement" }}
        >
          <AddAnnouncementForm
            data={selectedAnnouncement}
            onClose={() => setOpenAddAnnouncement(false)}
            onComplete={(data) => 
              handleAnnouncementSubmit(data)}
          />
        </DynamicDialog>
      )}
    </Box>
  );
};

export default EmployeeView;
