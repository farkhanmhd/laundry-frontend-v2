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
        <span className="hidden md:inline">Inventory</span>
      </Link>
      <Link
        className={cn(buttonVariants({ variant: "ghost" }), "rounded-none")}
        href="/inventories/logs"
      >
        <History />
        <span className="hidden md:inline">Logs</span>
      </Link>
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default InventoryLayout;
