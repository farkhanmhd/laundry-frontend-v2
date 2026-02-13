import { notFound } from "next/navigation";
import { OrderInfoCard } from "@/components/features/orders/order-info-card";
import { OrdersApi } from "@/lib/modules/orders/data";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderInformation = async ({ params }: Props) => {
  const { id } = await params;
  const data = await OrdersApi.getOrderStatus(id);

  if (!data) {
    notFound();
  }

  return <OrderInfoCard data={data} id={id} />;
};

export default OrderInformation;
