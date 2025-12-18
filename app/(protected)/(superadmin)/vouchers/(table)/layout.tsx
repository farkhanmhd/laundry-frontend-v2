import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "@/components/features/vouchers/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VoucherLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={columns}>
    <TableToolbar>
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/vouchers/new"
      >
        <Plus />
        Voucher
      </Link>
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default VoucherLayout;
