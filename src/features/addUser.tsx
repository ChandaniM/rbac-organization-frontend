import { Button } from "@mui/material";
import { useState } from "react";
import AddUserForm from "../components/AddUserForm";
import DynamicDialog from "../components/DynamicDialog";

const AddUser = () => {
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
        Add User
      </Button>
      <DynamicDialog
        open={open}
        header={{
          title: "Add User",
          subtitle: "Create a new organization user",
        }}
        onClose={() => setOpen(false)}
        onComplete={handleComplete}
      >
        <AddUserForm/>

      </DynamicDialog>
    </>
  );
};
export default AddUser;
