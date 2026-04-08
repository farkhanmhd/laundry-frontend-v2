"use client";

import { createContext, useContext, useState } from "react";

export type AlertDialogContextProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: unknown;
  setData: (data: unknown) => void;
};

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(
  undefined
);

export const AlertDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, onOpenChange] = useState(false);
  const [data, setData] = useState<unknown>(null);

  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange, data, setData }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialog = <T,>() => {
  const context = useContext(AlertDialogContext);

  if (!context) {
    throw new Error("useAlertDialog must be used with AlertDialogProvider");
  }

  return context as AlertDialogContextProps & { data: T };
};
