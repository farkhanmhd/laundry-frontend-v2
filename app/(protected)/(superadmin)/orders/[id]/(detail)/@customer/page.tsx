import { notFound } from "next/navigation";
import { OrderCustomerCard } from "@/components/features/orders/order-customer-card";
import { getOrderCustomer } from "@/lib/modules/orders/data";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderCustomer = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getOrderCustomer(id);

  if (!data) {
    notFound();
  }

  return <OrderCustomerCard data={data} />;
};

export default OrderCustomer;
