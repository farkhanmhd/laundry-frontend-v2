"use client";

import { useUserColumns } from "@/components/features/users/columns";
import { CreateUserDialog } from "@/components/features/users/create-user-dialog";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  const userColumns = useUserColumns();

  return (
    <TableProvider columns={userColumns} manualPagination>
      <TableToolbar>
        <CreateUserDialog />
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default UsersLayout;
