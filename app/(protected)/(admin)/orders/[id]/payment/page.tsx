"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { OrderPaymentDetailsCard } from "@/components/features/orders/order-payment-details-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderPaymentError } from "@/components/utils/error-cards";
import { OrdersApi } from "@/lib/modules/orders/data";
import { cardShadowStyle } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

const PaymentDetailsSkeleton = () => {
  return (
    <Card className="w-full max-w-md" style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-56 w-56 rounded-lg" />
        </div>
        <Separator />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Separator />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div className="flex items-center justify-between" key={i}>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentDetailPage = ({ params }: Props) => {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["order-payment-details", id],
    queryFn: () => OrdersApi.getOrderPaymentDetails(id),
    // Polling could be useful for payment pages, but let's stick to simple useQuery first
    // refetchInterval: 5000,
  });

  useEffect(() => {
    if (data && !data.actions && !isLoading) {
      router.replace(`/orders/${id}`);
    }
  }, [data, id, router, isLoading]);

  if (isLoading) {
    return (
      <section className="flex min-h-[calc(100dvh-128px)] w-full items-center justify-center p-4 md:min-h-[calc(100dvh-64px)] md:p-6">
        <PaymentDetailsSkeleton />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex min-h-[calc(100dvh-128px)] w-full items-center justify-center p-4 md:min-h-[calc(100dvh-64px)] md:p-6">
        <OrderPaymentError reset={() => refetch()} />
      </section>
    );
  }

  if (!data?.actions) {
    return null; // Will be handled by useEffect redirect
  }

  return (
    <section className="flex min-h-[calc(100dvh-128px)] w-full items-center justify-center p-4 md:min-h-[calc(100dvh-64px)] md:p-6">
      <OrderPaymentDetailsCard initialData={data} />
    </section>
  );
};

export default PaymentDetailPage;
