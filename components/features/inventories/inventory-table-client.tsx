"use client";

import { Plus, TableOfContents } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { TableProvider } from "@/components/table/context";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Inventory } from "@/lib/modules/inventories/data";
import { cardShadowStyle, cn } from "@/lib/utils";
import { useInventoryColumns } from "./columns";

interface Props {
  data: Inventory[];
}

export const InventoryTableClient = ({ data }: Props) => {
  const t = useTranslations("Inventories");
  const columns = useInventoryColumns();
  return (
    <TableProvider columns={columns}>
      <Card
        className="gap-0 overflow-hidden p-0 dark:bg-background"
        style={cardShadowStyle}
      >
        <CardHeader className="flex items-center justify-between border-b px-4 pt-6 pb-0 dark:bg-background">
          <CardTitle className="hidden md:block">{t("title")}</CardTitle>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <div className="flex items-center gap-3">
              <Button variant="outline">Export</Button>
              <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                href="/inventories/adjustments"
              >
                <TableOfContents />
                {t("logs.adjustmentButton")}
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                href="/inventories/usage"
              >
                <TableOfContents />
                {t("logs.usageButton")}
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                href="/inventories/restocks"
              >
                <TableOfContents />
                {t("logs.restockButton")}
              </Link>
              <Link className={cn(buttonVariants())} href="/inventories/new">
                <Plus />
                {t("form.product")}
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 dark:bg-background">
          <TableViewProvider data={data} withPagination={false} />
        </CardContent>
      </Card>
    </TableProvider>
  );
};
