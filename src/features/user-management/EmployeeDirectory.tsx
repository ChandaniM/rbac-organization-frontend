import { useState } from "react";
import DynamicDialog from "../../components/DynamicDialog";
import AddUserForm from "../../components/AddUserForm";
import { Button, Menu, MenuItem } from "@mui/material";
import { DynamicTable, type Column } from "../../components/DynamicTable";
import CustomPagination from "../../components/sharedComponents/Pagination";
import AssignReportingManagerDialog from "../../components/AssignReportingManagerDialog";
interface Employee {
  id: string | number;
  name: string;
  status?: string;
  role?: string;
}

const EmployeeDirectory = () => {
  const [opendialogManager, setOpendialogManager] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tableData, setTableData] = useState<Employee[]>([]);
  const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  });

  const [open, setOpen] = useState(false);

  const userColumns: Column<any>[] = [
    { key: "id", label: "Job ID" },
    { key: "name", label: "Employee Name" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" },
    { key: "actions", label: "Actions" },
  ];
  const addEmployee = (data: any) => {
    console.log(data, "218");
    setTableData((prev: any) => [
      ...prev,
      {
        id: data.username + Math.floor(Math.random() * 1000),
        name: data.username,
        status: data.is_active ? "Active" : "Inactive",
        role: data.role_id,
      },
    ]);
    setOpen(false);
  };
  function handleActionClick(
    event: React.MouseEvent<any>,
    item: Employee
  ): void {
    setAnchorEl(event.currentTarget);
    setSelectedRow(item);
  }

  function handlePageAction(page: number): void {
    console.log(page, "56");
  }

  function handleRowsPerPageChange(rows: number): void {
    console.log(rows);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleManagerDialogOpen = (value: boolean) => {
    setOpendialogManager(value);
  };

  const handleAssignManager = (data: any) => {
    console.log("Manager Assigned:", data);
    setOpendialogManager(false); // Success ke baad dialog close karein
  };
  const creatOrgUser = () =>{
    console.log("THIS BUTTON ONLY AVALAABLE FOR CREATE ORGANZIATION AND ITS ADMIN")
  }
  return (
    <>
      <div className='employee-container'>
        <div className='header flex gap-4 justify-end'>
        <Button
            variant='outlined'
            className='outline'
            onClick={() => creatOrgUser()}
          >
           Add Org
          </Button>
          <Button
            variant='outlined'
            className='outline'
            onClick={() => handleManagerDialogOpen(true)}
          >
            Add Reporting Manager
          </Button>
          <Button
            variant='contained'
            sx={{ bgcolor: "#10B981", "&:hover": { bgcolor: "#059669" } }}
            onClick={() => setOpen(true)}
          >
            Add Employee
          </Button>
        </div>
        {tableData.length > 0 ? (
          <div className=''>
            <DynamicTable
              columns={userColumns}
              data={tableData}
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
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No Employees found. Click "Add Employee" to start.
          </div>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => console.log("edit")}>Edit</MenuItem>
          <MenuItem
            onClick={() => console.log("delete")}
            sx={{ color: "error.main" }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      <DynamicDialog
        open={open}
        header={{
          title: "Add User",
          subtitle: "Create a new organization user",
        }}
        onClose={() => setOpen(false)}
      >
        <>
          <AddUserForm
            onComplete={(data) => {
              console.log("onComplete is:", "swkm");
              console.log("CREATE:", data);
              addEmployee(data);
            }}
            onClose={() => {
              console.log("close event");
            }}
          />
        </>
      </DynamicDialog>
      <AssignReportingManagerDialog
        open={opendialogManager}
        onClose={() => setOpendialogManager(false)}
        users={tableData} // Yahan wo users bhejien jinhe manager assign karna hai
        onAssign={handleAssignManager} // Submit handle karne ke liye function
      />
    </>
  );
};
export default EmployeeDirectory;
