import { Box, Button, Typography, Stack, Chip, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchInput } from "../../components/sharedComponents/SearchInput";
import { DynamicTable, type Column } from "../../components/DynamicTable";
import DynamicDialog from "../../components/DynamicDialog";
import { AddJobForm } from "../../components/AddJobForm";
import { getAllJobs, createJob, deleteJob, updateJob, } from "../../services/jobportal";
import CustomPagination from "../../components/sharedComponents/Pagination";
import { useAuth } from "../../store/AuthContext";

/* ================= TYPES ================= */
interface Job {
  id: string; // Changed from 'id' to '_id' to match MongoDB/API
  title: string;
  department: string;
  type: string;
  salary: string;
  experience: string;
  location: string;
  status: "Active" | "Closed" | "Draft";
  applicants: number;
}

const JobPortalFeature = () => {
  const {token , tenantId , logout} = useAuth();
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState<Job[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  });

  /* ================= API CALL: FETCH ALL ================= */
  const fetchJobs = async (
   
    page = pagination.currentPage,
    limit = pagination.pageSize,
    searchTerm = search
  ) => {
    if (!tenantId) {
      console.error("No Tenant ID found, redirecting to login");
      logout(); // optional: redirect to login
      return;
    }
    try {
      const response = await getAllJobs(tenantId! , page, limit, searchTerm);

      // 🔑 Map backend _id → frontend id
      const mappedJobs = response?.jobs.map((job: any) => ({
        id: job._id,
        title: job.title,
        department: job.department,
        type: job.type,
        salary: job.salary,
        experience: job.experience,
        location: job.location,
        status: job.status,
        applicants: job.applicants,
      }));

      setJobData(mappedJobs);

      setPagination((prev) => ({
        ...prev,
        currentPage: response.pagination.page,
        pageSize: response.pagination.limit,
        totalRecords: response.pagination.totalRecords,
        totalPages: response.pagination.totalPages,
      }));
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
   fetchJobs(1, pagination.pageSize, search);
  }, []);

  useEffect(() => {
    if (tenantId) {
      fetchJobs(1, pagination.pageSize, search);
    }
  }, [tenantId, search, pagination.pageSize]);

  /* ================= TABLE COLUMNS ================= */
  const jobColumns: Column<Job>[] = [
    { key: "id", label: "Job ID" }, // Use _id from backend
    { key: "title", label: "Position Name" },
    { key: "department", label: "Department" },
    { key: "salary", label: "Salary" },
    { key: "experience", label: "Experience" },
    { key: "location", label: "Location" },
    { key: "type", label: "Job Type" },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <Chip
          label={val || "Active"}
          size='small'
          color={
            val === "Active"
              ? "success"
              : val === "Draft"
              ? "warning"
              : "default"
          }
          variant='outlined'
        />
      ),
    },
    { key: "actions", label: "Actions" },
  ];

  /* ================= HANDLERS ================= */

  const handleCreateJob = () => {
    setSelectedJob(null);
    setOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  // API CALL: DELETE
  const handleDeleteJob = async (jobId: string) => {
    try {
      if (tenantId) {
        await deleteJob(tenantId, jobId);
        setJobData((prev) => prev.filter((job) => job.id !== jobId));
        handleMenuClose();
      }
    } catch (error) {
      alert("Failed to delete job");
    }
  };

  // API CALL: CREATE & UPDATE
  const handleFormSubmit = async (data: any) => {
    try {
      if (!tenantId) return;
        if (selectedJob) {
          // UPDATE MODE
          await updateJob(tenantId ,selectedJob.id, data);
        } else {
          // CREATE MODE
          await createJob(tenantId , {
            ...data,
            status: "Active",
            applicants: 0,
          });
      }
      // Refresh list from server to show latest data
      await fetchJobs();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Error saving job data");
    }
  };

  const handleCloseDialog = () => {
    setSelectedJob(null);
    setOpen(false);
  };

  const handleActionClick = (event: React.MouseEvent, job: Job) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setSelectedJob(job);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };
  const handlePageAction = (page: number) => {
    fetchJobs(page, pagination.pageSize, search);
  };

  const handleRowsPerPageChange = (rows: number) => {
    fetchJobs(1, rows, search); // reset to page 1
  };
  const handleSearch = (v: string) => {
    setSearch(v);
    // We don't call fetchJobs here manually; the useEffect handles it
  };
  return (
    <Box>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        mb={4}
      >
        <Typography variant='h4' fontWeight='bold'>
          Job Postings
        </Typography>
        <Button variant='contained' onClick={handleCreateJob}>
          Post New Job
        </Button>
      </Stack>

      {jobData.length > 0 ? (
        <>
          <Box
            bgcolor='white'
            p={2}
            border='1px solid #E2E8F0'
            borderBottom='none'
            borderRadius='8px 8px 0 0'
          >
            <SearchInput placeholder="'Search by title, department, location...'" onSearch={(v) => handleSearch(v)} />
          </Box>
          <div>
            <DynamicTable
              columns={jobColumns}
              data={jobData}
              onActionClick={handleActionClick}
            />
            <CustomPagination
              totalItems={pagination.totalRecords}
              itemsPerPage={pagination.pageSize}
              currentPage={pagination.currentPage}
              onPageChange={handlePageAction}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => selectedJob && handleEditJob( selectedJob)}>
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => selectedJob && handleDeleteJob(selectedJob.id)}
              sx={{ color: "error.main" }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box p={4} textAlign='center' color='text.secondary'>
          No jobs added yet
        </Box>
      )}

      <DynamicDialog
        open={open}
        header={{
          title: selectedJob ? "Edit Job Posting" : "Create Job Posting",
          subtitle: selectedJob ? "Update details" : "Publish new job",
        }}
        onClose={handleCloseDialog}
      >
        <AddJobForm
          onCancel={handleCloseDialog}
          onSubmit={handleFormSubmit}
          defaultValues={selectedJob ?? undefined}
        />
      </DynamicDialog>
    </Box>
  );
};

export default JobPortalFeature;
