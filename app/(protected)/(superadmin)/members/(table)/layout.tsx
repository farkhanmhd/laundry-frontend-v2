import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { AddMemberDialog } from "../components/add-member-dialog";

import { columns } from "../components/columns";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={columns} manualPagination>
    <TableToolbar>
      <AddMemberDialog />
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default ProductsLayout;
