"use client";

import type React from "react";
import { useId } from "react";
import { UpdateDeliveryDialog } from "@/components/features/routes/update-delivery-dialog";
import { AlertDialogProvider } from "@/components/providers/alert-dialog-provider";

type Props = {
  children: React.ReactNode;
};

const RouteDetailLayout = ({ children }: Props) => {
  const id = useId();
  return (
    <AlertDialogProvider>
      {children}
      <UpdateDeliveryDialog key={id} />
    </AlertDialogProvider>
  );
};

export default RouteDetailLayout;
