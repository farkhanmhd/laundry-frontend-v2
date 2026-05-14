import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OrderPaymentDetailsCard } from "@/components/features/orders/order-payment-details-card";
import { elysia } from "@/elysia";

interface Props {
  params: Promise<{ id: string }>;
}

async function getOrderPaymentDetails(id: string) {
  const { data: response } = await elysia
    .customerorders({ id })
    .payment_details.get({
      headers: await headers(),
    });

  const data = response?.data;

  return data;
}

const PaymentDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getOrderPaymentDetails(id);

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
