"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useVehicleColumns } from "@/components/features/vehicles/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VehicleLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Vehicles");
  const columns = useVehicleColumns();

  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <Link
          className={cn(buttonVariants(), "rounded-none")}
          href="/vehicles/new"
        >
          <Plus />
          {t("title")}
        </Link>
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default VehicleLayout;
