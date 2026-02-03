import { notFound } from "next/navigation";
import { OrderItemsCard } from "@/components/features/orders/order-items-card";
import { getOrderItems } from "@/lib/modules/orders/data";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderItems = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getOrderItems(id);

  if (!data) {
    notFound();
  }

  return <OrderItemsCard data={data} />;
};

export default OrderItems;
