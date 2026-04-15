"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useUserColumns } from "@/components/features/users/columns";
import { CreateUserDialog } from "@/components/features/users/create-user-dialog";
import { UpdaterequiredRoleDialog } from "@/components/features/users/user-role-dialog";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { UsersError } from "@/components/utils/error-cards";
import { UsersApi } from "@/lib/modules/users/data";

const UsersTableContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const rows = Number(searchParams.get("rows")) || 50;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users", { search, page, rows }],
    queryFn: () => UsersApi.getUsers({ search, page, rows }),
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <UsersError reset={() => refetch()} />
      </div>
    );
  }

  return (
    <>
      <TableView data={data?.users} total={data?.total} />
      <UpdaterequiredRoleDialog />
    </>
  );
};

const UsersTablePage = () => {
  const userColumns = useUserColumns();

  return (
    <TableProvider columns={userColumns} manualPagination>
      <TableToolbar>
        <CreateUserDialog />
      </TableToolbar>
      <UsersTableContent />
      <TablePagination />
    </TableProvider>
  );
};

export default UsersTablePage;
