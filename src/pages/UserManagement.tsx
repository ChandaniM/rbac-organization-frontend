import Layout from "../layouts/Layout";
import UserTable from "../components/UserTable";
import CustomPagination from "../components/sharedComponents/Pagination"
import { useState } from "react";
import AddUser from "../features/addUser";
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
  return (
    <Layout>
        <AddUser/>
        <div>
       <UserTable />
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