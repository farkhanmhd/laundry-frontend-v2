"use client";

import { OrderInfoError } from "@/components/features/orders/order-error-cards";

export default function PaymentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <OrderInfoError error={error} reset={reset} />;
}
