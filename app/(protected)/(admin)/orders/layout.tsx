import { UpdateOrderStatusDialog } from "@/components/features/orders/update-status-dialog";
import { AlertDialogProvider } from "@/components/providers/alert-dialog-provider";

type Props = {
  children: React.ReactNode;
};

const OrdersLayout = ({ children }: Props) => {
  return (
    <AlertDialogProvider>
      {children}
      <UpdateOrderStatusDialog />
    </AlertDialogProvider>
  );
};

export default OrdersLayout;
