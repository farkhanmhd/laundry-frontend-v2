import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "@/components/features/bundlings/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BundlingLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={columns}>
    <TableToolbar>
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/bundlings/new"
      >
        <Plus />
        Bundling
      </Link>
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default BundlingLayout;
