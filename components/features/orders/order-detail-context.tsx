"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext } from "react";
import {
  type OrderCustomerResponse,
  type OrderDelivery,
  type OrderDetailResponse,
  type OrderPaymentResponse,
  type OrderStatusResponse,
  OrdersApi,
} from "@/lib/modules/orders/data";

interface OrderDetailContextType {
  id: string;
  orderInfo: OrderStatusResponse | null | undefined;
  items: OrderDetailResponse | null | undefined;
  customer: OrderCustomerResponse | null | undefined;
  deliveries: OrderDelivery[] | null | undefined;
  payment: OrderPaymentResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const OrderDetailContext = createContext<OrderDetailContextType | undefined>(
  undefined
);

export function OrderDetailProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const {
    data: orderInfo,
    isLoading: isInfoLoading,
    isError: isInfoError,
    refetch: refetchInfo,
  } = useQuery({
    queryKey: ["order-status", id],
    queryFn: () => OrdersApi.getOrderStatus(id),
  });

  const {
    data: items,
    isLoading: isItemsLoading,
    isError: isItemsError,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["order-items", id],
    queryFn: () => OrdersApi.getOrderItems(id),
  });

  const {
    data: customer,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
    refetch: refetchCustomer,
  } = useQuery({
    queryKey: ["order-customer", id],
    queryFn: () => OrdersApi.getOrderCustomer(id),
  });

  const {
    data: deliveries,
    isLoading: isDeliveriesLoading,
    isError: isDeliveriesError,
    refetch: refetchDeliveries,
  } = useQuery({
    queryKey: ["order-deliveries", id],
    queryFn: () => OrdersApi.getOrderDeliveries(id),
  });

  const {
    data: payment,
    isLoading: isPaymentLoading,
    isError: isPaymentError,
    refetch: refetchPayment,
  } = useQuery({
    queryKey: ["order-payment", id],
    queryFn: () => OrdersApi.getOrderPayment(id),
  });

  const isLoading =
    isInfoLoading ||
    isItemsLoading ||
    isCustomerLoading ||
    isDeliveriesLoading ||
    isPaymentLoading;
  const isError =
    isInfoError ||
    isItemsError ||
    isCustomerError ||
    isDeliveriesError ||
    isPaymentError;

  const refetch = () => {
    refetchInfo();
    refetchItems();
    refetchCustomer();
    refetchDeliveries();
    refetchPayment();
  };

  return (
    <OrderDetailContext.Provider
      value={{
        id,
        orderInfo,
        items,
        customer,
        deliveries,
        payment,
        isLoading,
        isError,
        refetch,
      }}
    >
      {children}
    </OrderDetailContext.Provider>
  );
}

export function useOrderDetail() {
  const context = useContext(OrderDetailContext);
  if (context === undefined) {
    throw new Error(
      "useOrderDetail must be used within an OrderDetailProvider"
    );
  }
  return context;
}
