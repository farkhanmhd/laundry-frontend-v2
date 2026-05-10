"use client";

import { Plus, TableOfContents } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { TableProvider } from "@/components/table/context";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserRole } from "@/hooks/use-user-role";
import type { Inventory } from "@/lib/modules/inventories/data";
import { cardShadowStyle, cn } from "@/lib/utils";
import { useInventoryColumns } from "./columns";

interface Props {
  data: Inventory[];
}

export const InventoryTableClient = ({ data }: Props) => {
  const t = useTranslations("Inventories");
  const role = useUserRole();
  const columns = useInventoryColumns();

  return (
    <TableProvider columns={columns}>
      <Card
        className="gap-0 overflow-hidden p-0 dark:bg-background"
        style={cardShadowStyle}
      >
        <CardHeader className="gap-0 border-b px-4 pt-6 dark:bg-background [.border-b]:pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base md:text-lg">{t("title")}</CardTitle>

            {role === "superadmin" && (
              /* Desktop: single row */
              <div className="hidden items-center gap-2 lg:flex">
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                  href="/inventories/adjustments"
                >
                  <TableOfContents className="h-3.5 w-3.5" />
                  {t("logs.adjustmentButton")}
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                  href="/inventories/usage"
                >
                  <TableOfContents className="h-3.5 w-3.5" />
                  {t("logs.usageButton")}
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                  href="/inventories/restocks"
                >
                  <TableOfContents className="h-3.5 w-3.5" />
                  {t("logs.restockButton")}
                </Link>
                <Link
                  className={cn(buttonVariants({ size: "sm" }))}
                  href="/inventories/new"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t("form.product")}
                </Link>
              </div>
            )}
          </div>

          {role === "superadmin" && (
            /* Mobile: 2x2 grid + full-width add button */
            <div className="mt-3 flex flex-col gap-2 lg:hidden">
              <div className="grid grid-cols-2 gap-2">
                <Button className="w-full" size="sm" variant="outline">
                  Export
                </Button>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full justify-center"
                  )}
                  href="/inventories/adjustments"
                >
                  <TableOfContents className="h-3.5 w-3.5 shrink-0" />
                  {t("logs.adjustmentButton").split(" ").at(-1)}
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full justify-center"
                  )}
                  href="/inventories/usage"
                >
                  <TableOfContents className="h-3.5 w-3.5 shrink-0" />
                  {t("logs.usageButton").split(" ").at(-1)}
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full justify-center"
                  )}
                  href="/inventories/restocks"
                >
                  <TableOfContents className="h-3.5 w-3.5 shrink-0" />
                  {t("logs.restockButton").split(" ").at(-1)}
                </Link>
              </div>
              <Link
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "w-full justify-center"
                )}
                href="/inventories/new"
              >
                <Plus className="h-3.5 w-3.5 shrink-0" />
                {t("form.product")}
              </Link>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0 dark:bg-background">
          <TableViewProvider data={data} withPagination={false} />
        </CardContent>
      </Card>
    </TableProvider>
  );
};
