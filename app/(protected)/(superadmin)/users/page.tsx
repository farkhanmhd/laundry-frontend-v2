"use client";

import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { userColumns } from "./columns";
import { mockUsers } from "./data";

const UsersPage = () => (
  <TableProvider columns={userColumns}>
    <TableToolbar />
    {/* should be children here and this file should be layout.tsx */}
    <TableView data={mockUsers} />
    <TablePagination />
  </TableProvider>
);

export default UsersPage;
