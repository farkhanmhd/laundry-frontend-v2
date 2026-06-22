"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { TableProvider } from "@/components/table/context";
import { DataTableQuerySearch } from "@/components/table/data-table-query-search";
import { TableViewProvider } from "@/components/table/table-view-provider";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserData } from "@/hooks/use-user-data";
import type { Inventory } from "@/lib/modules/inventories/data";
import { cardShadowStyle, cn } from "@/lib/utils";
import { useInventoryColumns } from "./columns";

interface Props {
  data: Inventory[];
}

export const InventoryTableClient = ({ data }: Props) => {
  const t = useTranslations("Inventories");
  const userData = useUserData();
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
            <div className="flex gap-2">
              <DataTableQuerySearch className="w-80 max-w-80" />
              {userData?.role === "superadmin" && (
                <div className="flex gap-2">
                  <Link
                    className={cn(buttonVariants({ size: "sm" }))}
                    href="/inventories/new"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {t("form.inventory")}
                  </Link>
                </div>
              )}
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
