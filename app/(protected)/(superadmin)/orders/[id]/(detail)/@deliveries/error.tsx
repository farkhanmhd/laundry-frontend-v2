"use client";

import { OrderDeliveryError } from "@/components/features/orders/order-error-cards";

export default function PaymentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <OrderDeliveryError error={error} reset={reset} />;
}
