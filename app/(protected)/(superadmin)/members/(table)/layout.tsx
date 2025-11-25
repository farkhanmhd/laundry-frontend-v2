import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { columns } from "../components/columns";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={columns} manualPagination>
    <TableToolbar>
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/services/new"
      >
        <Plus />
        Member
      </Link>
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default ProductsLayout;
