import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { membersColumns } from "./columns";
import { mockMembers } from "./data";

const MembersPage = () => (
  <TableProvider columns={membersColumns}>
    <TableToolbar>
      <Link
        className={cn(buttonVariants(), "rounded-none")}
        href="/admin/members/new"
      >
        <Plus className="h-4 w-4" />
        Member
      </Link>
    </TableToolbar>
    <TableView data={mockMembers} />
    <TablePagination />
  </TableProvider>
);

export default MembersPage;
