import Layout from "../layouts/Layout";
import UserTable from "../components/UserTable";
import CustomPagination from "../components/sharedComponents/Pagination"
import { useState } from "react";
import AddUser from "../features/addUser";
import { DynamicTable, type Column } from "../components/DynamicTable";
import { Chip } from "@mui/material";
const UserManagementPage = () => {
        const [pagination, setPagination] = useState({
            current: 1,
            pageSize: 10,
            total: 100
          });
        const handlePageAction = (newPage: number) => {
            console.log("User moved to page:", newPage);
            setPagination(prev => ({ ...prev, current: newPage }));
          };
          const users = [
            {
              id: 4037,
              name: "Dipak Deb Nath",
              email: "dipak.uiux@gmail.com",
              status: "Active",
              designation: "Super Admin",
              code: "0121",
              role: "Admin",
            },
            {
              id: 4037,
              name: "Pappu Baidya",
              email: "dipak.uiux@gmail.com",
              status: "Active",
              designation: "Manager",
              code: "0121",
              role: "Admin",
            },
            {
              id: 4037,
              name: "Shipon Mohanta",
              email: "dipak.uiux@gmail.com",
              status: "Active",
              designation: "Trainer",
              code: "0121",
              role: "Instructor",
            },
          ];

 const userColumns: Column<any>[] = [
  {
    key: "name",
    label: "User Name",
  },
  {
    key: "id",
    label: "User ID",
  },
  {
    key: "status",
    label: "Status",
    render: (val) => (
      <Chip
        label={val}
        size="small"
        color={val === "Active" ? "success" : "default"}
        variant="outlined"
      />
    ),
  },
  {
    key: "designation",
    label: "Designation",
  },
  {
    key: "employeeCode",
    label: "Employee Code",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "actions",
    label: "Manage", // 👈 3-dot menu comes automatically
  },
];

const handleActionClick = (event: React.MouseEvent, userData: any) => {
  console.log(userData , "handleactionclicked")
};


  return (
    <Layout>
        <AddUser/>
        <div>
                 <DynamicTable
                   columns={userColumns}
                   data={users}
                   onActionClick={handleActionClick}
                 />
        <CustomPagination 
        totalItems={pagination.total}
        itemsPerPage={pagination.pageSize}
        currentPage={pagination.current}
        onPageChange={handlePageAction}
        onRowsPerPageChange={(rows) => setPagination(prev => ({ ...prev, pageSize: rows }))}
      />
        </div>
    </Layout>
  );
};

export default UserManagementPage;