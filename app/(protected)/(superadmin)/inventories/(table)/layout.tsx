import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { columns } from "../components/columns";

const InventoryLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={columns}>
    <TableToolbar>
      <Link className={cn(buttonVariants())} href="/inventories/new">
        <Plus />
        Inventory
      </Link>
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default InventoryLayout;
