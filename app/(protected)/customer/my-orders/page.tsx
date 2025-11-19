import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { customerOrdersColumns } from "./columns";
import { mockCustomerOrders } from "./data";

const MyOrdersPage = () => (
  <TableProvider columns={customerOrdersColumns}>
    <TableToolbar searchPlaceholder="Search your orders...">
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/customer/my-orders/new"
      >
        <Plus className="h-4 w-4" />
        New Order
      </Link>
    </TableToolbar>
    <TableView data={mockCustomerOrders} />
    <TablePagination />
  </TableProvider>
);

export default MyOrdersPage;
