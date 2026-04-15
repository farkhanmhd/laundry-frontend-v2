import { OrderDetailProvider } from "@/components/features/orders/order-detail-context";
import { OrderDetailView } from "@/components/features/orders/order-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <OrderDetailProvider id={id}>
      <OrderDetailView />
    </OrderDetailProvider>
  );
};

export default OrderDetailPage;
