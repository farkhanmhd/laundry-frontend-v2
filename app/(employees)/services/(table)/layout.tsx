import { TableToolbar } from "@/components/table/table-toolbar";
import { columns } from "../components/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <Link href='/services/new' className={cn(buttonVariants())}>
          <Plus />
          Service
        </Link>
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default ProductsLayout;
