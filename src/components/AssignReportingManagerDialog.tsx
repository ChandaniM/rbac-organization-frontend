import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

interface User {
    id: string;
    name: string;
    designation?: string;
    role?: string;
    jobTitle?: string;
    [key: string]: any;
}

interface AssignReportingManagerDialogProps {
    open: boolean;
    onClose: () => void;
    users: User[];
    onAssign: (employeeId: string, managerId: string) => void;
}

const AssignReportingManagerDialog: React.FC<AssignReportingManagerDialogProps> = ({
    open,
    onClose,
    users,
    onAssign,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState<string | "">("");
    const [selectedManager, setSelectedManager] = useState<string | "">("");

    const reportingManagers = users.filter((user) => {
        const title = (user.jobTitle || user.designation || "").toLowerCase();
        return title.includes("manager") || title.includes("admin");
    });

    // Fallback: if we can't detect managers, allow selecting any user as a manager
    const managerOptions = reportingManagers.length ? reportingManagers : users;

    const handleAssign = () => {
        if (!selectedEmployee || !selectedManager) return;

        onAssign(selectedEmployee, selectedManager);

        setSelectedEmployee("");
        setSelectedManager("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Assign / Edit Reporting Manager</DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 1,
                }}
            >
                {/* Employee Dropdown */}
                <FormControl fullWidth>
                    <InputLabel>Select Employee</InputLabel>
                    <Select
                        value={selectedEmployee}
                        label="Select Employee"
                        onChange={(e) => setSelectedEmployee(String(e.target.value))}
                    >
                        {users.map((emp) => (
                            <MenuItem key={emp.id} value={emp.id}>
                                {emp.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Reporting Manager Dropdown */}
                <FormControl fullWidth disabled={!selectedEmployee}>
                    <InputLabel>Select Reporting Manager</InputLabel>
                    <Select
                        value={selectedManager}
                        label="Select Reporting Manager"
                        onChange={(e) => setSelectedManager(String(e.target.value))}
                    >
                        {managerOptions.map((mgr) => (
                            <MenuItem key={mgr.id} value={mgr.id}>
                                {mgr.name} ({mgr.jobTitle || mgr.designation || "Manager"})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleAssign}
                    disabled={!selectedEmployee || !selectedManager}
                >
                    Assign
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignReportingManagerDialog;
