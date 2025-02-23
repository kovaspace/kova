"use client";

import { useDialogContext } from "@/context/dialogContext";
import AddCustomerDialog from "../AddCustomerDialog/AddCustomerDialog";
import EditCustomerDialog from "../EditCustomerDialog";
import AddBookingDialog from "../AddBookingDialog";

const DialogWrapper = ({ accountId }: { accountId: string }) => {
  const { openDialog, setOpenDialog } = useDialogContext();

  const closeDialog = () => setOpenDialog(null);

  return (
    <>
      {openDialog === "addCustomer" && (
        <AddCustomerDialog onClose={closeDialog} />
      )}
      {openDialog === "addBooking" && (
        <AddBookingDialog onClose={closeDialog} accountId={accountId} />
      )}
      {openDialog === "editCustomer" && (
        <EditCustomerDialog onClose={closeDialog} />
      )}
    </>
  );
};

export default DialogWrapper;
