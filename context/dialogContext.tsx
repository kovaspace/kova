"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type DialogTypes = "addCustomer" | "addBooking" | "editCustomer" | null;

type DialogContextType = {
  openDialog: DialogTypes;
  setOpenDialog: (dialog: DialogTypes) => void;
  customerId?: string | null;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [openDialog, setOpenDialog] = useState<DialogTypes>(null);

  return (
    <DialogContext.Provider value={{ openDialog, setOpenDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};
