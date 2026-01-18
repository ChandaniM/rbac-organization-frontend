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
    id: number;
    name: string;
    designation?: string;
    role?: string;
}

interface AssignReportingManagerDialogProps {
    open: boolean;
    onClose: () => void;
    users: User[];
    onAssign: (employeeId: number, managerId: number) => void;
}

const AssignReportingManagerDialog: React.FC<AssignReportingManagerDialogProps> = ({
    open,
    onClose,
    users,
    onAssign,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState<number | "">("");
    const [selectedManager, setSelectedManager] = useState<number | "">("");

    const reportingManagers = users.filter(
        (user) => user.role === "Admin" || user.designation === "Manager"
    );

    const handleAssign = () => {
        if (!selectedEmployee || !selectedManager) return;

        onAssign(selectedEmployee as number, selectedManager as number);

        setSelectedEmployee("");
        setSelectedManager("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Assign Reporting Manager</DialogTitle>

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
                        onChange={(e) => setSelectedEmployee(e.target.value as number)}
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
                        onChange={(e) => setSelectedManager(e.target.value as number)}
                    >
                        {reportingManagers.map((mgr) => (
                            <MenuItem key={mgr.id} value={mgr.id}>
                                {mgr.name} ({mgr.designation})
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
