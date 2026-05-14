"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { DeliverSelectedDelivery } from "@/components/features/deliveries/deliver-selected-delivery";
import { useDeliveryColumns } from "@/components/features/deliveries/delivery-columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { OrderDeliveryError } from "@/components/utils/error-cards";
import { DeliveriesApi } from "@/lib/modules/deliveries/data";

const DeliveriesTableContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const rows = Number(searchParams.get("rows")) || 50;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["deliveries", { search, page, rows }],
    queryFn: () => DeliveriesApi.getDeliveries({ search, page, rows }),
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <OrderDeliveryError reset={() => refetch()} />
      </div>
    );
  }

  return <TableView data={data} />;
};

const DeliveriesPage = () => {
  const columns = useDeliveryColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableToolbar>
        <DeliverSelectedDelivery />
      </TableToolbar>
      <DeliveriesTableContent />
      <TablePagination />
    </TableProvider>
  );
};

export default DeliveriesPage;
