"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const CustomerOrderEmptyItems = () => {
  const t = useTranslations("CustomerOrders");
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>{t("orderSummary.noItemsAdded")}</EmptyTitle>
        <EmptyDescription>{t("orderSummary.cartEmpty")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/customer-orders/new"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t("orderSummary.addItem")}
        </Link>
      </EmptyContent>
    </Empty>
  );
};
