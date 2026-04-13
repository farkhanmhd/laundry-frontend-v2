"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { elysia } from "@/elysia";
import type { AccountAddress } from "@/lib/modules/account/data";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";

const getUserAddresses = async () => {
  const { data: response } = await elysia.account.addresses.get({
    fetch: {
      credentials: "include",
    },
  });

  return response?.data ?? [];
};

const createDeliveryRequest = async (body: {
  addressId: string;
  orderId: string;
}) => {
  const { data, error } = await elysia.customerorders["request-delivery"].post(
    body,
    {
      fetch: {
        credentials: "include",
      },
    }
  );

  if (error) {
    throw new Error(`Error: ${error.value.type}`);
  }

  return data?.data.deliveryId;
};

const getCustomerOrderDetailPageData = async (orderId: string) => {
  const [detail, items, payment, deliveries] = await Promise.all([
    CustomerOrdersApi.getCustomerOrderDetail(orderId),
    CustomerOrdersApi.getCustomerOrderItems(orderId),
    CustomerOrdersApi.getCustomerOrderPayment(orderId),
    CustomerOrdersApi.getCustomerOrderDelivery(orderId),
  ]);

  return {
    detail,
    items,
    payment,
    deliveries,
  };
};

type CustomerOrderDetailPageData = Awaited<
  ReturnType<typeof getCustomerOrderDetailPageData>
>;
type CustomerOrderDetail = CustomerOrderDetailPageData["detail"];
type CustomerOrderPayment = CustomerOrderDetailPageData["payment"];

const fallbackDetail: CustomerOrderDetail = {
  createdAt: "",
  status: "pending",
};

const fallbackPayment: CustomerOrderPayment = {
  actions: null,
  amountPaid: 0,
  change: 0,
  method: null,
  status: "pending",
  total: 0,
};

interface CustomerOrderDetailContextValue extends CustomerOrderDetailPageData {
  addresses: AccountAddress[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  selectingAddress: boolean;
  selectedAddress: string | null;
  setSelectingAddress: (value: boolean) => void;
  setSelectedAddress: (value: string | null) => void;
  requestDelivery: () => void;
  isRequestingDelivery: boolean;
  canRequestDelivery: boolean;
  canCancelPickupRequest: boolean;
  isCancellingPickupRequest: boolean;
  handleCancelPickupRequest: () => void;
}

const CustomerOrderDetailContext =
  createContext<CustomerOrderDetailContextValue | null>(null);

export const CustomerOrderDetailProvider = ({
  children,
  orderId,
}: {
  children: React.ReactNode;
  orderId: string;
}) => {
  const queryClient = useQueryClient();
  const [selectingAddress, setSelectingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const detailQuery = useQuery({
    queryKey: ["customer-order-detail-page", orderId],
    queryFn: () => getCustomerOrderDetailPageData(orderId),
  });

  const addressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: getUserAddresses,
  });

  const requestDeliveryMutation = useMutation({
    mutationFn: createDeliveryRequest,
    onSuccess: async () => {
      toast.success("Delivery request submitted successfully");
      setSelectingAddress(false);
      setSelectedAddress(null);
      await queryClient.invalidateQueries({
        queryKey: ["customer-order-detail-page", orderId],
      });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : String(error));
    },
  });

  const cancelPickupRequestMutation = useMutation({
    mutationFn: () => CustomerOrdersApi.cancelCustomerOrder(orderId),
    onSuccess: async (result) => {
      if (result.error) {
        throw new Error(
          result.error.value?.message || "Failed to cancel pickup request"
        );
      }

      toast.success("Pickup request cancelled successfully");
      await queryClient.invalidateQueries({
        queryKey: ["customer-order-detail-page", orderId],
      });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : String(error));
    },
  });

  const detail = detailQuery.data?.detail;
  const items = detailQuery.data?.items ?? [];
  const payment = detailQuery.data?.payment;
  const deliveries = detailQuery.data?.deliveries ?? [];
  const addresses = addressesQuery.data ?? [];

  const hasDeliveryRequest = deliveries.some(
    (delivery) => delivery.type === "delivery"
  );
  const hasRequestedPickup = deliveries.some(
    (delivery) => delivery.type === "pickup" && delivery.status === "requested"
  );
  const canRequestDelivery =
    !hasDeliveryRequest &&
    !!detail &&
    !!payment &&
    (detail.status === "ready" || detail.status === "processing") &&
    payment.status === "settlement";
  const canCancelPickupRequest = hasRequestedPickup && !hasDeliveryRequest;

  const value = useMemo<CustomerOrderDetailContextValue>(
    () => ({
      detail: detail ?? fallbackDetail,
      items,
      payment: payment ?? fallbackPayment,
      deliveries,
      addresses,
      isLoading: detailQuery.isLoading || addressesQuery.isLoading,
      isError: detailQuery.isError,
      error: detailQuery.error,
      selectingAddress,
      selectedAddress,
      setSelectingAddress,
      setSelectedAddress,
      requestDelivery: () => {
        if (!selectedAddress) {
          return;
        }

        requestDeliveryMutation.mutate({
          addressId: selectedAddress,
          orderId,
        });
      },
      isRequestingDelivery: requestDeliveryMutation.isPending,
      canRequestDelivery: detail && payment ? canRequestDelivery : false,
      canCancelPickupRequest:
        detail && payment ? canCancelPickupRequest : false,
      isCancellingPickupRequest: cancelPickupRequestMutation.isPending,
      handleCancelPickupRequest: () => {
        cancelPickupRequestMutation.mutate();
      },
    }),
    [
      addresses,
      addressesQuery.isLoading,
      canCancelPickupRequest,
      canRequestDelivery,
      deliveries,
      detail,
      detailQuery.error,
      detailQuery.isError,
      detailQuery.isLoading,
      items,
      orderId,
      payment,
      cancelPickupRequestMutation,
      requestDeliveryMutation,
      selectedAddress,
      selectingAddress,
    ]
  );

  return (
    <CustomerOrderDetailContext.Provider value={value}>
      {children}
    </CustomerOrderDetailContext.Provider>
  );
};

export const useCustomerOrderDetail = () => {
  const context = useContext(CustomerOrderDetailContext);

  if (!context) {
    throw new Error(
      "useCustomerOrderDetail must be used within a CustomerOrderDetailProvider"
    );
  }

  return context;
};
