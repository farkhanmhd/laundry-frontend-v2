import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usersColumns } from "./columns";
import { mockUsers } from "./data";

const UsersPage = () => (
  <TableProvider columns={usersColumns}>
    <TableToolbar>
      <Link className={cn(buttonVariants(), "rounded-none")} href="#">
        <Plus className="h-4 w-4" />
        User
      </Link>
    </TableToolbar>
    <TableView data={mockUsers} />
    <TablePagination />
  </TableProvider>
);

export default UsersPage;
