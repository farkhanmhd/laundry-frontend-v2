"use client";

import { OrderPaymentError } from "@/components/features/orders/order-error-cards";

export default function PaymentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <OrderPaymentError error={error} reset={reset} />;
}
