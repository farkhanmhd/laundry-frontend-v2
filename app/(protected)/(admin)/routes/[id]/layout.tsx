"use client";

import type React from "react";
import { UpdateDeliveryDialog } from "@/components/features/routes/update-delivery-dialog";
import { AlertDialogProvider } from "@/components/providers/alert-dialog-provider";

type Props = {
  children: React.ReactNode;
};

const RouteDetailLayout = ({ children }: Props) => {
  return (
    <AlertDialogProvider>
      <div>{children}</div>
      <UpdateDeliveryDialog />
    </AlertDialogProvider>
  );
};

export default RouteDetailLayout;
