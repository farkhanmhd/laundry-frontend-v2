"use client";

import { userColumns } from "@/components/features/users/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";

const UsersLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={userColumns} manualPagination>
    <TableToolbar searchPlaceholder="Search by Username or Name..." />
    {children}
    <TablePagination />
  </TableProvider>
);

export default UsersLayout;
