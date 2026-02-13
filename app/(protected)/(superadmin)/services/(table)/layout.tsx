"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useServiceColumns } from "@/components/features/services/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ServicesLayout = ({ children }: { children: React.ReactNode }) => {
  const columns = useServiceColumns();
  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <Link
          className={cn(buttonVariants(), "rounded-none")}
          href="/services/new"
        >
          <Plus />
          Service
        </Link>
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default ServicesLayout;
