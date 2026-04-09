import { notFound } from "next/navigation";
import { OrderInfoCard } from "@/components/features/orders/order-info-card";
import { OrdersApi } from "@/lib/modules/orders/data";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderInformation = async ({ params }: Props) => {
  const { id } = await params;
  const data = await OrdersApi.getOrderStatus(id);
  const deliveries = await OrdersApi.getOrderDeliveries(id);

  if (!data) {
    console.log("Order not found");
    notFound();
  }

  return <OrderInfoCard data={data} deliveries={deliveries} id={id} />;
};

export default OrderInformation;
