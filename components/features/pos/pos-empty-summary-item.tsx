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

export function PosEmptySummaryItem() {
  const t = useTranslations("POS.emptySummaryItem");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>{t("noItemsAdded")}</EmptyTitle>
        <EmptyDescription>{t("cartIsEmpty")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link className={buttonVariants({ variant: "secondary" })} href="/pos">
          <Plus className="mr-2 h-4 w-4" />
          {t("addItem")}
        </Link>
      </EmptyContent>
    </Empty>
  );
}
