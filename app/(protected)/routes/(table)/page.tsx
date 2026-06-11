"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouteColumns } from "@/components/features/routes/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { OrderInfoError } from "@/components/utils/error-cards";
import { RoutesApi } from "@/lib/modules/routes/data";

const RoutesTableContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const rows = Number(searchParams.get("rows")) || 50;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["routes", { search, page, rows }],
    queryFn: () => RoutesApi.getRoutes({ search, page, rows }),
    refetchOnWindowFocus: true,
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
      data={data?.routes}
      total={data?.total}
    />
  );
};

const RoutesTablePage = () => {
  const columns = useRouteColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableToolbar />
      <RoutesTableContent />
      <TablePagination />
    </TableProvider>
  );
};

export default RoutesTablePage;
