import { notFound } from "next/navigation";
import { OrderDeliveryCard } from "@/components/features/orders/order-delivery-card";
import { OrdersApi } from "@/lib/modules/orders/data";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderDelivery = async ({ params }: Props) => {
  const { id } = await params;
  const deliveries = await OrdersApi.getOrderDeliveries(id);

  if (deliveries === undefined) {
    notFound();
  }

  return <OrderDeliveryCard items={deliveries} />;
};

export default OrderDelivery;
