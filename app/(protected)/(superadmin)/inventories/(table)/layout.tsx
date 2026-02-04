import { History, Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "@/components/features/inventories/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const InventoryLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={columns}>
    <TableToolbar>
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/inventories/new"
      >
        <Plus />
        Inventory
      </Link>
      <Link
        className={cn(buttonVariants({ variant: "ghost" }), "rounded-none")}
        href="/inventories/history"
      >
        <History />
        History
      </Link>
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default InventoryLayout;
