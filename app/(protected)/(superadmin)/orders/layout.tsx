import type React from "react";
import { UpdateOrderStatusDialog } from "@/components/features/orders/update-status-dialog";
import { AlertDialogProvider } from "@/components/providers/alert-dialog-provider";

interface Props {
  children: React.ReactNode;
}
const OrdersRootLayout = ({ children }: Props) => {
  return (
    <AlertDialogProvider>
      {children}
      <UpdateOrderStatusDialog />
    </AlertDialogProvider>
  );
};

export default OrdersRootLayout;
