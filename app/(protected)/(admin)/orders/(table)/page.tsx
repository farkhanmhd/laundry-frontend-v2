"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ordersColumns } from "@/components/features/orders/column";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { OrderInfoError } from "@/components/utils/error-cards";
import { OrdersApi } from "@/lib/modules/orders/data";

const OrdersTableContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const rows = Number(searchParams.get("rows")) || 50;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders", { search, page, rows }],
    queryFn: () => OrdersApi.getOrders({ search, page, rows }),
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <OrderInfoError reset={() => refetch()} />
      </div>
    );
  }

  return (
    <TableView
      className="h-[calc(100dvh-128px) md:h-calc(100dvh-64px)"
      data={data?.orders}
      total={data?.total}
    />
  );
};

const OrdersTablePage = () => {
  return (
    <TableProvider columns={ordersColumns} manualPagination>
      <TableToolbar />
      <OrdersTableContent />
      <TablePagination />
    </TableProvider>
  );
};

export default OrdersTablePage;
