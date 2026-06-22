"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Table as TanstackTable,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useWeightRangeColumns } from "@/components/features/weight-ranges/columns";
import DataTable from "@/components/table/data-table";
import { TablePagination } from "@/components/table/table-pagination";
import { buttonVariants } from "@/components/ui/button";
import { AuthorizedComponent } from "@/components/utils/authorized-component";
import type { WeightRange } from "@/lib/modules/weight-ranges/data";
import { cn } from "@/lib/utils";

type Props = {
  data: WeightRange[];
};

export const WeightRangesTable = ({ data }: Props) => {
  const t = useTranslations("WeightRanges");
  const columns = useWeightRangeColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className="h-full space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">{t("title")}</h1>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>
        <AuthorizedComponent requiredRole="superadmin">
          <Link
            className={cn(buttonVariants(), "rounded-none")}
            href="/weight-ranges/new"
          >
            <Plus />
            {t("form.addNew")}
          </Link>
        </AuthorizedComponent>
      </div>
      <DataTable<WeightRange, unknown>
        columns={columns}
        table={table as TanstackTable<WeightRange>}
      />
      <TablePagination />
    </div>
  );
};
