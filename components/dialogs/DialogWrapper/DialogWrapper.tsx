"use client";

import { useDialogContext } from "@/context/dialogContext";
import AddCustomerDialog from "../AddCustomerDialog/AddCustomerDialog";
import EditCustomerDialog from "../EditCustomerDialog";
import AddBookingDialog from "../AddBookingDialog";
import ViewBookingDialog from "../ViewBookingDialog";

const DialogWrapper = ({ accountId }: { accountId: string }) => {
  const { openDialog, setOpenDialog, id } = useDialogContext();

  const closeDialog = () => setOpenDialog(null);

  return (
    <>
      {openDialog === "addCustomer" && (
        <AddCustomerDialog onClose={closeDialog} />
      )}
      {openDialog === "editCustomer" && (
        <EditCustomerDialog onClose={closeDialog} customerId={id as string} />
      )}
      {openDialog === "addBooking" && (
        <AddBookingDialog onClose={closeDialog} accountId={accountId} />
      )}
      {openDialog === "editBooking" && (
        <ViewBookingDialog
          onClose={closeDialog}
          accountId={accountId}
          bookingId={id as string}
        />
      )}
      {openDialog === "viewBooking" && (
        <ViewBookingDialog
          onClose={closeDialog}
          accountId={accountId}
          bookingId={id as string}
        />
      )}
    </>
  );
};

export default DialogWrapper;
