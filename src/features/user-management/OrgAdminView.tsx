import { Button, Box, Typography, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import CreateOrgDialog from "../../components/CreateOrgDialog";
import { createOrg, getAllOrganizations } from "../../services/organization";
// Note: You should have an updateOrg service. I've added a placeholder comment for it.
import { useAuth } from "../../store/AuthContext";
import { DynamicTable, type Column } from "../../components/DynamicTable";
import CustomPagination from "../../components/sharedComponents/Pagination";

export interface Organization {
  id: string;
  name: string;
  display_name?: string | null;
  username: string;
  role: string;
  status: string;
  createdAt?: string | null;
  description?: string; // Added for edit completeness
}

const OrgAdminView = () => {
  const { token } = useAuth();

  const [openOrgDialog, setOpenOrgDialog] = useState(false);
  const [orgTableData, setOrgTableData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Organization | null>(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
  });

  const orgColumns: Column<Organization>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Org Name" },
    { key: "display_name", label: "Display Name" },
    { key: "username", label: "Username" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At" },
    { key: "actions", label: "Actions" },
  ];

  useEffect(() => {
    fetchOrg();
  }, []);

  const fetchOrg = async () => {
    try {
      setLoading(true);
      const organizationArray = await getAllOrganizations(token);
      setOrgTableData(organizationArray || []);
      setPagination((prev) => ({
        ...prev,
        totalRecords: organizationArray?.length || 0,
      }));
    } catch (error) {
      console.error("Failed to fetch organizations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: { org: any; user: any }) => {
    try {
      if (editingOrg) {
        // Logic for Update: Call your update API here
        console.log("Updating organization ID:", editingOrg.id, data.org);
        // await updateOrg(token, editingOrg.id, data.org); 
      } else {
        await createOrg(token, data);
      }
      setOpenOrgDialog(false);
      setEditingOrg(null);
      fetchOrg();
    } catch (error) {
      console.error("Failed to process organization request", error);
    }
  };

  const handleActionClick = (event: React.MouseEvent<any>, item: Organization) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (!selectedRow) return;
    setEditingOrg(selectedRow);
    setOpenOrgDialog(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (!selectedRow) return;
    console.log("Delete ID:", selectedRow.id);
    handleMenuClose();
  };

  return (
    <Box p={3}>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
        <Typography variant='h6' fontWeight={600}>Organizations</Typography>
        <Button 
          variant='contained' 
          onClick={() => {
            setEditingOrg(null); // Ensure clean state for new org
            setOpenOrgDialog(true);
          }}
        >
          Add Organization
        </Button>
      </Box>

      <div>
        {loading ? (
          <Typography align='center'>Loading organizations...</Typography>
        ) : orgTableData.length === 0 ? (
          <Typography align='center' color='text.secondary'>
            No organizations found.
          </Typography>
        ) : (
          <>
            <DynamicTable<Organization>
              columns={orgColumns}
              data={orgTableData}
              onActionClick={handleActionClick}
            />
            <CustomPagination
              totalItems={pagination.totalRecords}
              itemsPerPage={pagination.pageSize}
              currentPage={pagination.currentPage}
              onPageChange={(page) => setPagination((p) => ({ ...p, currentPage: page }))}
              onRowsPerPageChange={(rows) => setPagination((p) => ({ ...p, pageSize: rows }))}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>Delete</MenuItem>
            </Menu>
          </>
        )}
      </div>

      <CreateOrgDialog
        open={openOrgDialog}
        initialData={editingOrg}
        onClose={() => {
          setOpenOrgDialog(false);
          setEditingOrg(null);
        }}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default OrgAdminView;