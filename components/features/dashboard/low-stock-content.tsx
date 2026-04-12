"use client";

import { useQuery } from "@tanstack/react-query";
import { PackageCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { LowStockItem } from "@/components/features/inventories/low-stock-item";
import { CardContent } from "@/components/ui/card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import { LowStockError } from "./low-stock-error";
import { LowStockSkeleton } from "./low-stock-skeleton";

export function LowStockContent() {
  const {
    data: lowStockItems,
    isLoading,
    isFetching,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["lowStock"],
    queryFn: AdminDashboardApi.getLowStock,
  });

  const t = useTranslations("Dashboard.superadmin.lowStock");

  if (isLoading || isFetching) {
    return <LowStockSkeleton />;
  }

  if (isError) {
    return (
      <LowStockError error={error as Error} resetErrorBoundary={refetch} />
    );
  }

  if (!lowStockItems) {
    return null;
  }

  return (
    <CardContent className="h-full">
      {lowStockItems.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <PackageCheck className="h-10 w-10" />
          <p className="text-sm">{t("allHealthy")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {lowStockItems.map((item) => (
            <LowStockItem item={item} key={item.id} />
          ))}
        </div>
      )}
    </CardContent>
  );
}
