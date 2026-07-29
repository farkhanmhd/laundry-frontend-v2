"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { elysiaClient } from "@/elysia/client";
import type { AccountAddress } from "@/lib/modules/account/data";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";
import type { CustomerItemCatalog } from "@/lib/modules/customer-orders/schema";
import { toastResponse } from "@/lib/toast-helper";

const getUserAddresses = async () => {
  const { data: response } = await elysiaClient.account.addresses.get({
    fetch: {
      credentials: "include",
    },
  });

  return response?.data ?? [];
};

const createDeliveryRequest = async (body: {
  addressId: string;
  orderId: string;
  requestTime: string;
}) => {
  const { data, error } = await elysiaClient.customerorders[
    "request-delivery"
  ].post(body, {
    fetch: {
      credentials: "include",
    },
  });

  if (error) {
    throw error.value || new Error("Error creating delivery request");
  }

  return data;
};

const getCustomerOrderDetailPageData = async (orderId: string) => {
  const [detail, items, payment, deliveries, catalogs] = await Promise.all([
    CustomerOrdersApi.getCustomerOrderDetail(orderId),
    CustomerOrdersApi.getCustomerOrderItems(orderId),
    CustomerOrdersApi.getCustomerOrderPayment(orderId),
    CustomerOrdersApi.getCustomerOrderDelivery(orderId),
    CustomerOrdersApi.getCatalogs(),
  ]);

  return {
    detail,
    items,
    payment,
    deliveries,
    catalogs,
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

export interface EditableOrderItem {
  itemId: string;
  catalogId: string;
  itemType: "service" | "inventory" | "points" | "bundling" | "voucher";
  quantity: number;
  name: string;
  price: number;
  subtotal: number;
  note: string | null;
  items?: { id: string; quantity: number; name: string }[];
  isNew: boolean;
  maxWeight?: number | null;
}

interface CustomerOrderDetailContextValue extends CustomerOrderDetailPageData {
  addresses: AccountAddress[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  selectingAddress: boolean;
  selectedAddress: string | null;
  setSelectingAddress: (value: boolean) => void;
  setSelectedAddress: (value: string | null) => void;
  requestTime: Date | undefined;
  setRequestTime: (date: Date | undefined) => void;
  requestDelivery: () => void;
  isRequestingDelivery: boolean;
  canRequestDelivery: boolean;
  canCancelPickupRequest: boolean;
  isCancellingPickupRequest: boolean;
  handleCancelPickupRequest: () => void;
  hasRequestedPickup: boolean;
  catalogs: CustomerItemCatalog[];
  data: EditableOrderItem[];
  isEditing: boolean;
  editingTotal: number;
  enterEditMode: () => void;
  cancelEditMode: () => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  addItem: (catalog: CustomerItemCatalog) => void;
  saveEdits: () => void;
  isSavingEdits: boolean;
  canSave: boolean;
  saveError: string | null;
  hasProgressingPickup: boolean;
  selectedWeightRangeId: number | null;
  setSelectedWeightRangeId: (id: number | null) => void;
  weight: number | null | undefined;
  setWeight: (weight: number | null | undefined) => void;
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
  const tNotifications = useTranslations("Notifications");
  const [selectingAddress, setSelectingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [requestTime, setRequestTime] = useState<Date | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItems, setEditingItems] = useState<EditableOrderItem[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selectedWeightRangeId, setSelectedWeightRangeId] = useState<
    number | null
  >(null);
  const [weight, setWeight] = useState<number | null | undefined>(undefined);

  const detailQuery = useQuery({
    queryKey: ["customer-order-detail-page", orderId],
    queryFn: () => getCustomerOrderDetailPageData(orderId),
    refetchOnWindowFocus: true,
  });

  const addressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: getUserAddresses,
  });

  const requestDeliveryMutation = useMutation({
    mutationFn: createDeliveryRequest,
    onSuccess: async (data) => {
      if (data) {
        toast.success(toastResponse(tNotifications, data));
      }
      setSelectingAddress(false);
      setSelectedAddress(null);
      await queryClient.invalidateQueries({
        queryKey: ["customer-order-detail-page", orderId],
      });
    },
    onError: (error) => {
      toast.error(
        toastResponse(
          tNotifications,
          (error as { messageKey?: string; message?: string }) || {}
        )
      );
    },
  });

  const cancelPickupRequestMutation = useMutation({
    mutationFn: () => CustomerOrdersApi.cancelCustomerOrder(orderId),
    onSuccess: async (result) => {
      if (result.error) {
        toast.error(
          toastResponse(
            tNotifications,
            (result.error.value as { messageKey?: string; message?: string }) ||
              {}
          )
        );
        return;
      }

      const responseData = (result.data || {}) as {
        messageKey?: string;
        messageParams?: Record<string, unknown>;
        message?: string;
      };
      toast.success(
        toastResponse(tNotifications, {
          ...responseData,
          messageParams: { ...responseData.messageParams, orderId },
        })
      );
      await queryClient.invalidateQueries({
        queryKey: ["customer-order-detail-page", orderId],
      });
    },
    onError: (error) => {
      toast.error(
        toastResponse(
          tNotifications,
          (error as { messageKey?: string; message?: string }) || {}
        )
      );
    },
  });

  const detail = detailQuery.data?.detail;
  const items = detailQuery.data?.items ?? [];
  const payment = detailQuery.data?.payment;
  const deliveries = detailQuery.data?.deliveries ?? [];
  const addresses = addressesQuery.data ?? [];
  const catalogs = detailQuery.data?.catalogs ?? [];

  const mapOrderItemToEditable = useCallback(
    (item: (typeof items)[number]): EditableOrderItem => {
      const catalog = catalogs.find(
        (c) => c.itemType === item.itemType && c.name === item.name
      );
      return {
        itemId: item.id,
        catalogId: catalog?.id ?? "",
        itemType: item.itemType,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        subtotal: item.subtotal,
        note: item.note,
        items: "items" in item ? item.items : undefined,
        isNew: false,
        maxWeight:
          "maxWeight" in item
            ? (item as unknown as { maxWeight?: number | null }).maxWeight
            : catalog?.maxWeight,
      };
    },
    [catalogs]
  );

  const enterEditMode = useCallback(() => {
    const editable = items
      .filter((item) => !["voucher", "points"].includes(item.itemType))
      .map(mapOrderItemToEditable);
    setEditingItems(editable);
    setIsEditing(true);
    setSaveError(null);
  }, [items, mapOrderItemToEditable]);

  const cancelEditMode = useCallback(() => {
    setEditingItems([]);
    setIsEditing(false);
    setSaveError(null);
    setSelectedWeightRangeId(null);
    setWeight(undefined);
  }, []);

  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    setEditingItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId
          ? {
              ...item,
              quantity,
              subtotal: item.price * quantity,
            }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setEditingItems((prev) => prev.filter((item) => item.itemId !== itemId));
  }, []);

  const addItem = useCallback(
    (catalogItem: CustomerItemCatalog) => {
      const isDuplicate = editingItems.some(
        (item) =>
          item.catalogId === catalogItem.id &&
          item.itemType === catalogItem.itemType
      );
      if (isDuplicate) {
        return;
      }

      const newItem: EditableOrderItem = {
        itemId: `new_${catalogItem.id}`,
        catalogId: catalogItem.id,
        itemType: catalogItem.itemType as EditableOrderItem["itemType"],
        quantity: 1,
        name: catalogItem.name,
        price: catalogItem.price,
        subtotal: catalogItem.price,
        note: null,
        items: "items" in catalogItem ? catalogItem.items : undefined,
        isNew: true,
        maxWeight:
          "maxWeight" in catalogItem
            ? (catalogItem as unknown as { maxWeight?: number | null })
                .maxWeight
            : undefined,
      };
      setEditingItems((prev) => [...prev, newItem]);
      setSaveError(null);
    },
    [editingItems]
  );

  const saveMutation = useMutation({
    mutationFn: async (
      body: Parameters<typeof CustomerOrdersApi.updateCustomerOrderItems>[1]
    ) => {
      await CustomerOrdersApi.updateCustomerOrderItems(orderId, body);
    },
    onSuccess: async () => {
      toast.success(
        toastResponse(tNotifications, {
          messageKey: "order.items.updated",
          message: "Order items updated successfully",
        })
      );
      setIsEditing(false);
      setEditingItems([]);
      setSaveError(null);
      await queryClient.invalidateQueries({
        queryKey: ["customer-order-detail-page", orderId],
      });
    },
    onError: (error) => {
      toast.error(
        toastResponse(
          tNotifications,
          (error as { messageKey?: string; message?: string }) || {}
        )
      );
    },
  });

  const saveEdits = useCallback(() => {
    if (editingItems.length === 0) {
      setSaveError("At least one item is required");
      return;
    }
    const hasServiceOrBundling = editingItems.some(
      (item) => item.itemType === "service" || item.itemType === "bundling"
    );
    if (!hasServiceOrBundling) {
      setSaveError("At least one service or bundling item is required");
      return;
    }
    const seen = new Set<string>();
    for (const item of editingItems) {
      const key = `${item.itemType}:${item.catalogId || item.name}`;
      if (seen.has(key)) {
        setSaveError("Duplicate items are not allowed");
        return;
      }
      seen.add(key);
    }
    setSaveError(null);
    const body: Parameters<
      typeof CustomerOrdersApi.updateCustomerOrderItems
    >[1] = {
      data: editingItems.map((item) => ({
        itemId: item.catalogId,
        itemType: item.itemType as "service" | "inventory" | "bundling",
        quantity: item.quantity,
      })),
      weightRangeId: selectedWeightRangeId ?? 0,
      ...(weight !== undefined ? { weight } : {}),
    };
    saveMutation.mutate(body);
  }, [editingItems, saveMutation, selectedWeightRangeId, weight]);

  const nonEditableItems = useMemo(
    () =>
      items
        .filter((item) => ["voucher", "points"].includes(item.itemType))
        .map(mapOrderItemToEditable),
    [items, mapOrderItemToEditable]
  );

  const data = useMemo(() => {
    if (isEditing) {
      return [...editingItems, ...nonEditableItems];
    }

    const editable = items
      .filter((item) => !["voucher", "points"].includes(item.itemType))
      .map(mapOrderItemToEditable);
    const nonEditable = items
      .filter((item) => ["voucher", "points"].includes(item.itemType))
      .map(mapOrderItemToEditable);

    return [...editable, ...nonEditable];
  }, [
    isEditing,
    editingItems,
    items,
    mapOrderItemToEditable,
    nonEditableItems,
  ]);
  const editingTotal = useMemo(
    () => data.reduce((sum, item) => sum + item.subtotal, 0),
    [data]
  );
  const canSave = useMemo(
    () =>
      isEditing &&
      editingItems.length > 0 &&
      editingItems.some(
        (item) => item.itemType === "service" || item.itemType === "bundling"
      ) &&
      selectedWeightRangeId != null &&
      !saveMutation.isPending,
    [isEditing, editingItems, saveMutation.isPending, selectedWeightRangeId]
  );

  const hasDeliveryRequest = deliveries.some(
    (delivery) => delivery.type === "delivery"
  );
  const hasRequestedPickup = deliveries.some(
    (delivery) => delivery.type === "pickup" && delivery.status === "requested"
  );

  const hasProgressingPickup = deliveries.some(
    (delivery) =>
      delivery.type === "pickup" &&
      (delivery.status === "requested" || delivery.status === "in_progress")
  );

  const canRequestDelivery =
    !hasDeliveryRequest &&
    !!detail &&
    !!payment &&
    (detail.status === "ready" || detail.status === "processing") &&
    payment.status === "settlement";

  const canCancelPickupRequest =
    payment?.status !== "settlement" &&
    hasRequestedPickup &&
    !hasDeliveryRequest;

  const value = useMemo<CustomerOrderDetailContextValue>(
    () => ({
      detail: detail ?? fallbackDetail,
      items,
      payment: payment ?? fallbackPayment,
      deliveries,
      addresses,
      hasRequestedPickup,
      isLoading: detailQuery.isLoading || addressesQuery.isLoading,
      isError: detailQuery.isError,
      error: detailQuery.error,
      selectingAddress,
      selectedAddress,
      setSelectingAddress,
      setSelectedAddress,
      requestTime,
      setRequestTime,
      requestDelivery: () => {
        if (!(selectedAddress && requestTime)) {
          return;
        }

        const isoRequestTime = new Date(requestTime);

        requestDeliveryMutation.mutate({
          addressId: selectedAddress,
          orderId,
          requestTime: isoRequestTime.toISOString(),
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
      catalogs,
      data,
      isEditing,
      editingTotal,
      enterEditMode,
      cancelEditMode,
      updateItemQuantity,
      removeItem,
      addItem,
      saveEdits,
      isSavingEdits: saveMutation.isPending,
      canSave,
      saveError,
      hasProgressingPickup,
      selectedWeightRangeId,
      setSelectedWeightRangeId,
      weight,
      setWeight,
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
      requestTime,
      selectedAddress,
      selectingAddress,
      hasRequestedPickup,
      catalogs,
      data,
      isEditing,
      editingTotal,
      enterEditMode,
      cancelEditMode,
      updateItemQuantity,
      removeItem,
      addItem,
      saveEdits,
      saveMutation.isPending,
      canSave,
      saveError,
      hasProgressingPickup,
      selectedWeightRangeId,
      weight,
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
