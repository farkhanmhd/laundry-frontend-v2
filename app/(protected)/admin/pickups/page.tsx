import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pickupsColumns } from "./columns";
import { mockPickups } from "./data";

const PickupsPage = () => (
  <TableProvider columns={pickupsColumns}>
    <TableToolbar>
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/admin/pickups"
      >
        <Plus className="h-4 w-4" />
        Pickup
      </Link>
    </TableToolbar>
    <TableView data={mockPickups} />
    <TablePagination />
  </TableProvider>
);

export default PickupsPage;
