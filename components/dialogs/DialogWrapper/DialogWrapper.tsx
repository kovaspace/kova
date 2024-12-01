"use client";

import { useDialogContext } from "@/context/dialogContext";
import AddCustomerDialog from "../AddCustomerDialog/AddCustomerDialog";
import EditCustomerDialog from "../EditCustomerDialog";

const DialogWrapper = () => {
  const { openDialog, setOpenDialog } = useDialogContext();

  const closeDialog = () => setOpenDialog(null);

  return (
    <>
      {openDialog === "addCustomer" && (
        <AddCustomerDialog onClose={closeDialog} />
      )}
      {openDialog === "editCustomer" && (
        <EditCustomerDialog onClose={closeDialog} />
      )}
    </>
  );
};

export default DialogWrapper;
