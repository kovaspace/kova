"use client";

import { useDialogContext } from "@/context/dialogContext";
import AddCustomerDialog from "../AddCustomerDialog/AddCustomerDialog";
import EditCustomerDialog from "../EditCustomerDialog";
import AddBookingDialog from "../AddBookingDialog";

const DialogWrapper = () => {
  const { openDialog, setOpenDialog } = useDialogContext();

  const closeDialog = () => setOpenDialog(null);

  return (
    <>
      {openDialog === "addCustomer" && (
        <AddCustomerDialog onClose={closeDialog} />
      )}
      {openDialog === "addBooking" && (
        <AddBookingDialog onClose={closeDialog} />
      )}
      {openDialog === "editCustomer" && (
        <EditCustomerDialog onClose={closeDialog} />
      )}
    </>
  );
};

export default DialogWrapper;
