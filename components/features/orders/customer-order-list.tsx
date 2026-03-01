"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCustomerOrders } from "@/hooks/use-customer-orders";
import { OrderListItem } from "./order-list-item";
import { OrderListItemSkeleton } from "./order-list-item-skeleton";

export const CustomerOrderList = () => {
  const t = useTranslations("CustomerOrders");
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useCustomerOrders();

  if (isLoading) {
    return (
      <div className="grid gap-4">
        <OrderListItemSkeleton shadow />
        <OrderListItemSkeleton shadow />
        <OrderListItemSkeleton shadow />
        <OrderListItemSkeleton shadow />
      </div>
    );
  }

  const orders = data?.pages.flatMap((order) => order.data) || [];

  return (
    <div className="grid gap-4">
      {orders?.map((order) => (
        <OrderListItem key={order.id} order={order} shadow />
      ))}
      {isFetchingNextPage && (
        <>
          <OrderListItemSkeleton shadow />
          <OrderListItemSkeleton shadow />
          <OrderListItemSkeleton shadow />
          <OrderListItemSkeleton shadow />
        </>
      )}
      {hasNextPage ? (
        <Button
          disabled={isLoading || isFetchingNextPage}
          onClick={() => fetchNextPage()}
          variant="secondary"
        >
          {isLoading || isFetchingNextPage ? "Loading..." : t("loadMore")}
        </Button>
      ) : (
        <p className="text-center text-muted-foreground">{t("noMoreOrders")}</p>
      )}
    </div>
  );
};
