import { Box, Button, Typography, Stack, Chip } from "@mui/material";
import { useState } from "react";
import { SearchInput } from "../../components/sharedComponents/SearchInput";
import { DynamicTable, type Column } from "../../components/DynamicTable";
import DynamicDialog from "../../components/DynamicDialog";
import { AddJobForm } from "../../components/AddJobForm";
import { Menu, MenuItem } from "@mui/material";

/* ================= TYPES ================= */

interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  status: "Active" | "Closed" | "Draft";
  applicants: number;
}

/* ================= COMPONENT ================= */

const JobPortalFeature = () => {
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState<Job[]>([]);
  /* ================= TABLE COLUMNS ================= */

  const jobColumns: Column<Job>[] = [
    { key: "id", label: "Job ID" },
    { key: "title", label: "Position Name" },
    { key: "department", label: "Department" },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <Chip
          label={val}
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
    { key: "applicants", label: "Applicants" },
    {
      key: "actions",
      label: "Actions",
    },
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

  const handleDeleteJob = (jobId: string) => {
    console.log(jobId, "deleted id");

    setJobData((prev) => prev.filter((job) => job.id !== jobId));
  };

  const handleCloseDialog = () => {
    setSelectedJob(null);
    setOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    if (selectedJob) {
      // EDIT MODE
      setJobData((prev) =>
        prev.map((job) =>
          job.id === selectedJob.id ? { ...job, ...data } : job
        )
      );
    } else {
      // CREATE MODE
      const newJob: Job = {
        id: `J${Date.now()}`,
        title: data.title,
        department: data.department,
        type: data.type,
        status: "Active",
        applicants: 0,
      };

      setJobData((prev) => [...prev, newJob]);
    }

    handleCloseDialog();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const openMenu = Boolean(anchorEl);

  const handleActionClick = (event: React.MouseEvent, job: Job) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setSelectedJob(job);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  /* ================= UI ================= */

  return (
    <Box>
      {/* Header */}
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
          {/* Search */}
          <Box
            bgcolor='white'
            p={2}
            border='1px solid #E2E8F0'
            borderBottom='none'
            borderRadius='8px 8px 0 0'
          >
            <SearchInput onSearch={(v) => console.log(v)} />
          </Box>

          <DynamicTable
            columns={jobColumns}
            data={jobData}
            onActionClick={handleActionClick}
          />

          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                if (selectedJob) handleEditJob(selectedJob);
              }}
            >
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
          subtitle: selectedJob
            ? "Update the job details below"
            : "Provide the details below to publish a new job opening",
        }}
        onClose={handleCloseDialog}
        onComplete={handleCloseDialog}
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
