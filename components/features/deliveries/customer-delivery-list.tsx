"use client";

import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useCustomerDeliveries } from "@/hooks/use-customer-deliveries";
import { DeliveriesItem } from "./deliveries-item";
import { DeliveriesItemSkeleton } from "./deliveries-item-skeleton";

export const CustomerDeliveryList = () => {
  const t = useTranslations("CustomerDeliveries");
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useCustomerDeliveries();

  if (isLoading) {
    return (
      <>
        <DeliveriesItemSkeleton shadow />
        <DeliveriesItemSkeleton shadow />
        <DeliveriesItemSkeleton shadow />
        <DeliveriesItemSkeleton shadow />
        <DeliveriesItemSkeleton shadow />
      </>
    );
  }

  const deliveries = data?.pages.flatMap((page) => page.data) || [];

  if (deliveries.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Package className="size-6" />
          </EmptyMedia>
          <EmptyTitle>{t("noDeliveries")}</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <>
      {deliveries?.map((delivery) => (
        <DeliveriesItem delivery={delivery} key={delivery.id} shadow />
      ))}
      {isFetchingNextPage && (
        <>
          <DeliveriesItemSkeleton shadow />
          <DeliveriesItemSkeleton shadow />
          <DeliveriesItemSkeleton shadow />
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
        <p className="text-center text-muted-foreground">
          {t("noMoreDeliveries")}
        </p>
      )}
    </>
  );
};
