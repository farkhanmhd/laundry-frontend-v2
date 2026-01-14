import { notFound } from "next/navigation";
import { OrderPaymentCard } from "@/components/features/orders/order-payment-card";
import { getOrderPayment } from "@/lib/modules/orders/data";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderPayment = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getOrderPayment(id);

  if (!data) {
    notFound();
  }

  return <OrderPaymentCard data={data} orderId={id} />;
};

export default OrderPayment;
