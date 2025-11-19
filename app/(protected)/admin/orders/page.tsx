import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ordersColumns } from "./columns";
import { mockOrders } from "./data";

const OrdersPage = () => (
  <TableProvider columns={ordersColumns}>
    <TableToolbar>
      <Link className={cn(buttonVariants(), "rounded-none")} href="#">
        <Plus className="h-4 w-4" />
        Order
      </Link>
    </TableToolbar>
    <TableView data={mockOrders} />
    <TablePagination />
  </TableProvider>
);

export default OrdersPage;
