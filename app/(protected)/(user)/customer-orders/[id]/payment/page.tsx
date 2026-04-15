import { redirect } from "next/navigation";
import { OrderPaymentDetailsCard } from "@/components/features/orders/order-payment-details-card";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";

interface Props {
  params: Promise<{ id: string }>;
}

const PaymentDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const data = await CustomerOrdersApi.getOrderPaymentDetails(id);

  if (!data) {
    redirect(`/customer-orders/${id}`);
  }

  return (
    <section className="flex min-h-[calc(100dvh-128px)] w-full items-center justify-center p-4 md:min-h-[calc(100dvh-64px)] md:p-6">
      <OrderPaymentDetailsCard initialData={data} />
    </section>
  );
};

export default PaymentDetailPage;
