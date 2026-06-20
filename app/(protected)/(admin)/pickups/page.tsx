"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { DeliveryStatusFilter } from "@/components/features/deliveries/delivery-status-filter";
import { usePickupColumns } from "@/components/features/deliveries/pickup-columns";
import { PickupSelectedDelivery } from "@/components/features/deliveries/pickup-selected-delivery";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { OrderDeliveryError } from "@/components/utils/error-cards";
import {
  type DeliveryStatus,
  deliveryStatus,
  PickupsApi,
} from "@/lib/modules/deliveries/data";

const PickupsTableContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const rows = Number(searchParams.get("rows")) || 50;
  const rawStatus = searchParams.getAll("status");
  const status: DeliveryStatus[] | undefined = rawStatus.length
    ? rawStatus.flatMap((s) => deliveryStatus.find((v) => v === s) ?? [])
    : undefined;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pickups", { search, page, rows, status }],
    queryFn: () => PickupsApi.getPickups({ search, page, rows, status }),
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <OrderDeliveryError reset={() => refetch()} />
      </div>
    );
  }

  return <TableView data={data} />;
};

const PickupsPage = () => {
  const columns = usePickupColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableToolbar>
        <PickupSelectedDelivery />
        <DeliveryStatusFilter />
      </TableToolbar>
      <PickupsTableContent />
      <TablePagination />
    </TableProvider>
  );
};

export default PickupsPage;
