"use client";

import { useUserColumns } from "@/components/features/users/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  const userColumns = useUserColumns();

  return (
    <TableProvider columns={userColumns} manualPagination>
      <TableToolbar searchPlaceholder="Search by Username or Name..." />
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default UsersLayout;
