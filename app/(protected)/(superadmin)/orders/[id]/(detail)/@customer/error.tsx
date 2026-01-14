"use client";

import { OrderCustomerError } from "@/components/features/orders/order-error-cards";

export default function PaymentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <OrderCustomerError error={error} reset={reset} />;
}
