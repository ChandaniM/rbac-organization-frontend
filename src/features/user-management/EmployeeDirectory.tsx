import { useEffect, useState } from "react";
import AddUser from "../../features/addUser";
import { Chip } from "@mui/material";
import CustomPagination from "../../components/sharedComponents/Pagination";
import { DynamicTable, type Column } from "../../components/DynamicTable";
import { SearchInput } from "../../components/sharedComponents/SearchInput";
import { getAllEmployees } from "../../services/employeeDirectory";
const EmployeeDirectory = () => {
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 100,
    });
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
                    size='small'
                    color={val === "Active" ? "success" : "default"}
                    variant='outlined'
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
    // ON INIT
    useEffect(() => {
        fetchEmployee(pagination.current, pagination.pageSize, search);
    }, []);

    // ON CHANGES
    useEffect(() => {
        fetchEmployee(pagination.current, pagination.pageSize, search);
    }, [search, pagination.current]);

    // GET ALL EMPLOYEE 
    const fetchEmployee = async (page: number, pageSize: number, search: string) => {
        const employeData = await getAllEmployees(page , pageSize , search)
    }
    const handlePageAction = (newPage: number) => {
        console.log("User moved to page:", newPage);
        setPagination((prev) => ({ ...prev, current: newPage }));
    };
    const handleActionClick = (event: React.MouseEvent, userData: any) => {
        console.log(userData, "handleactionclicked");
    };
    const handleSearch = (value: string) => {
        console.log("Searching for:", value);
        setSearch(value)
    };
    return (
        <>
            <AddUser />
            <div style={{ backgroundColor: 'white', padding: '16px', borderBottom: '1px solid #eee' }}>
                <SearchInput
                    placeholder="Search by name, email or designation..."
                    onSearch={(value) => handleSearch(value)}
                />
            </div>
            {search}
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
                    onRowsPerPageChange={(rows) =>
                        setPagination((prev) => ({ ...prev, pageSize: rows }))
                    }
                />
            </div>
        </>
    )
}
export default EmployeeDirectory;

