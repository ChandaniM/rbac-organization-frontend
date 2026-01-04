import { Button } from "@mui/material";
import { useState } from "react";
import DynamicDialog from "../components/DynamicDialog";

const AddRoles = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    console.log("AddUserBUtton Cliclks");
    
  };

  const handleComplete = (data: any) => {
    console.log("Data from dialog:", data);
    setOpen(false);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add Roles
      </Button>
      <DynamicDialog
        open={open}
        header={{
          title: "Add New Roles",
          subtitle: "Create a new organization user",
        }}
        onClose={() => setOpen(false)}
        onComplete={handleComplete}
      >
        <div>UI FOR Roles :  Adding New Roles</div>
      </DynamicDialog>
    </>
  );
};
export default AddRoles;
