"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useWeightRangeColumns } from "@/components/features/weight-ranges/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { AuthorizedComponent } from "@/components/utils/authorized-component";
import type { WeightRange } from "@/lib/modules/weight-ranges/data";
import { cn } from "@/lib/utils";

type Row = WeightRange & { id: string };

const WeightRangesLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("WeightRanges");
  const columns = useWeightRangeColumns() as ColumnDef<Row>[];
  return (
    <TableProvider<Row> columns={columns}>
      <TableToolbar>
        <AuthorizedComponent requiredRole="superadmin">
          <Link
            className={cn(buttonVariants(), "rounded-none")}
            href="/weight-ranges/new"
          >
            <Plus />
            {t("form.addNew")}
          </Link>
        </AuthorizedComponent>
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default WeightRangesLayout;
