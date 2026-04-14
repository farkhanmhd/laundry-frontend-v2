"use client";

import { OrderCustomerCard } from "@/components/features/orders/order-customer-card";
import { OrderDeliveryCard } from "@/components/features/orders/order-delivery-card";
import { useOrderDetail } from "@/components/features/orders/order-detail-context";
import { OrderInfoCard } from "@/components/features/orders/order-info-card";
import { OrderItemsCard } from "@/components/features/orders/order-items-card";
import { OrderPaymentCard } from "@/components/features/orders/order-payment-card";
import {
  OrderCustomerSkeleton,
  OrderDeliverySkeleton,
  OrderInfoSkeleton,
  OrderItemsSkeleton,
  OrderPaymentSkeleton,
} from "@/components/features/orders/skeletons";
import {
  OrderCustomerError,
  OrderDeliveryError,
  OrderInfoError,
  OrderItemsError,
  OrderPaymentError,
} from "@/components/utils/error-cards";

export function OrderDetailView() {
  const {
    orderInfo,
    items,
    customer,
    deliveries,
    payment,
    isLoading,
    isError,
    refetch,
  } = useOrderDetail();

  if (isLoading) {
    return (
      <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <OrderInfoSkeleton />
            <OrderItemsSkeleton />
            <OrderPaymentSkeleton />
          </div>
          <div className="space-y-6">
            <OrderCustomerSkeleton />
            <OrderDeliverySkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <OrderInfoError reset={refetch} />
            <OrderItemsError reset={refetch} />
            <OrderPaymentError reset={refetch} />
          </div>
          <div className="space-y-6">
            <OrderCustomerError reset={refetch} />
            <OrderDeliveryError reset={refetch} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {orderInfo && <OrderInfoCard />}
          {items && <OrderItemsCard />}
          {payment && <OrderPaymentCard />}
        </div>
        <div className="space-y-6">
          {customer && <OrderCustomerCard />}
          {deliveries && <OrderDeliveryCard />}
        </div>
      </div>
    </section>
  );
}
