import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deliveriesColumns } from "./columns";
import { mockDeliveries } from "./data";

const MyDeliveriesPage = () => (
  <TableProvider columns={deliveriesColumns}>
    <TableToolbar searchPlaceholder="Search deliveries...">
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/my-deliveries/new"
      >
        <Plus className="h-4 w-4" />
        Request Delivery
      </Link>
    </TableToolbar>
    <TableView data={mockDeliveries} />
    <TablePagination />
  </TableProvider>
);

export default MyDeliveriesPage;
