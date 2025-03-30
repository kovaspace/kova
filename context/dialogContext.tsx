"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type DialogTypes =
  | "addCustomer"
  | "addBooking"
  | "editCustomer"
  | "editBooking"
  | "viewBooking"
  | null;

type DialogContextType = {
  openDialog: DialogTypes;
  setOpenDialog: (dialog: DialogTypes, id?: string) => void;
  id?: string | null;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogTypes>(null);
  const [id, setId] = useState<string | null>(null);

  const setOpenDialog = (dialog: DialogTypes, id: string | null = null) => {
    setDialog(dialog);
    setId(id);
  };

  return (
    <DialogContext.Provider value={{ openDialog: dialog, setOpenDialog, id }}>
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
