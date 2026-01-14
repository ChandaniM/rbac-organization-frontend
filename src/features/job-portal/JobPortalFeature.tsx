import { Box, Button, Typography, Stack, Chip } from "@mui/material";
// import { JobStats } from "./components/JobStats";
// import { JobTable } from "./components/JobTable";
import { SearchInput } from "../../components/sharedComponents/SearchInput";
import { DynamicTable, type Column } from "../../components/DynamicTable";
import { useState, type MouseEvent } from "react";
import DynamicDialog from "../../components/DynamicDialog";
import { AddJobForm } from "../../components/AddJobForm";
interface Job {
    id: string;
    title: string;
    department: string;
    type: string;
    status: "Active" | "Closed" | "Draft";
    applicants: number;
  }
 const JobPortalFeature = () => {
     const [open, setOpen] = useState(false);
    
    const jobData: Job[] = [
        { id: "J001", title: "React Developer", department: "Engineering", type: "Full-time", status: "Active", applicants: 45 },
        { id: "J002", title: "UI/UX Designer", department: "Product", type: "Contract", status: "Draft", applicants: 12 },
        { id: "J003", title: "Node.js Backend", department: "Engineering", type: "Full-time", status: "Closed", applicants: 89 },
      ];
    
      // 3. Define the COLUMNS configuration
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
              size="small" 
              color={val === "Active" ? "success" : val === "Draft" ? "warning" : "default"} 
              variant="outlined" 
            />
          )
        },
        { key: "applicants", label: "Applicants" },
        { key: "actions", label: "Actions" }
      ];
    function handleMenu(e: MouseEvent<Element, MouseEvent>, job: Job): void {
        console.log(e , job);
    }
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleFormSubmit = (data: any) => {
    console.log("New Job Data Submitted:", data);
    // Here you would normally send 'data' to your API
    handleCloseDialog();
  };
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Job Postings</Typography>
        <Button variant="contained" sx={{ bgcolor: "#3B82F6" }} onClick={() => setOpen(true)} >Post New Job</Button>
      </Stack>

      {/* <JobStats /> */}

      <Box bgcolor="white" p={2} border="1px solid #E2E8F0" borderBottom="none" borderRadius="8px 8px 0 0">
         <SearchInput onSearch={(v) => console.log(v)} />
      </Box>
      <DynamicTable columns={jobColumns} data={jobData} onActionClick={(e:any, job) => handleMenu(e, job)} />

      <DynamicDialog
        open={open}
        header={{
          title: "Create Job Posting",
          subtitle: "Provide the details below to publish a new job opening",
        }}
        onClose={() => setOpen(false)}
        onComplete={() => setOpen(false)}
      > 
      <AddJobForm onCancel={handleCloseDialog} onSubmit={handleFormSubmit} />
      </DynamicDialog>
    </Box>
  );
};
export default JobPortalFeature;
