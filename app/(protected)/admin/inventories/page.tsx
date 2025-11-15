import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { inventoriesColumns } from "./columns";
import { mockInventories } from "./data";

const InventoriesPage = () => (
  <TableProvider columns={inventoriesColumns}>
    <TableToolbar>
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/admin/inventories/new"
      >
        <Plus className="h-4 w-4" />
        Inventory
      </Link>
    </TableToolbar>
    <TableView data={mockInventories} />
    <TablePagination />
  </TableProvider>
);

export default InventoriesPage;
