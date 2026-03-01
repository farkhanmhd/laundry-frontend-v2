import { useEffect, useState } from "react";
import { elysia } from "@/elysia";
import type { OrderPaymentDetails } from "@/lib/modules/orders/data";

type PaymentSocketMessage = {
  updated: boolean;
  message: string;
  result: {
    transactionStatus: string;
    updatedAt: string;
  };
  type: string;
  orderId: string;
  status: string;
};

const TERMINAL_STATUSES = ["settlement", "capture", "cancel", "expire", "deny"];

export const usePaymentDetail = (initialData: OrderPaymentDetails) => {
  const [paymentDetails, setPaymentDetails] =
    useState<OrderPaymentDetails>(initialData);
  const isQris = paymentDetails.paymentType === "qris";
  const isPending = paymentDetails.transactionStatus === "pending";
  const isSettlement = paymentDetails.transactionStatus === "settlement";
  const isPaid = isSettlement;

  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const isExpired = timeLeft === "Expired";

  useEffect(() => {
    if (!(isPending && paymentDetails.expiryTime)) {
      return;
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const expiry = new Date(paymentDetails.expiryTime as string).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [paymentDetails.expiryTime, isPending, paymentDetails]);

  useEffect(() => {
    if (!paymentDetails.orderId) {
      return;
    }

    if (TERMINAL_STATUSES.includes(paymentDetails.transactionStatus)) {
      console.log("Already Paid");
      return;
    }

    const socket = elysia.orders
      .payment({ id: paymentDetails.orderId })
      .subscribe();

    socket.on("open", () => {
      console.log("Client connected");
    });

    socket.on("message", (event) => {
      const data = event.data as PaymentSocketMessage;

      if (data.result) {
        setPaymentDetails((prev) => {
          return {
            ...prev,
            transactionStatus: data.result.transactionStatus,
            updatedAt: data.result.updatedAt,
          };
        });
      }
    });

    return () => {
      socket.close();
    };
  }, [paymentDetails.orderId, paymentDetails.transactionStatus]);

  return {
    paymentDetails,
    isQris,
    isPending,
    isSettlement,
    isPaid,
    timeLeft,
    isExpired,
  };
};
