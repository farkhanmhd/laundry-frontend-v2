import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { vouchersColumns } from "./columns";
import { mockVouchers } from "./data";

const VouchersPage = () => (
  <TableProvider columns={vouchersColumns}>
    <TableToolbar>
      <Link className={cn(buttonVariants(), "rounded-none")} href="#">
        <Plus className="h-4 w-4" />
        Voucher
      </Link>
    </TableToolbar>
    <TableView data={mockVouchers} />
    <TablePagination />
  </TableProvider>
);

export default VouchersPage;
