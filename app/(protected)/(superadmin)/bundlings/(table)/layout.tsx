"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useBundlingColumns } from "@/components/features/bundlings/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BundlingLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Bundlings");
  const columns = useBundlingColumns();

  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <Link
          className={cn(buttonVariants(), "rounded-none")}
          href="/bundlings/new"
        >
          <Plus />
          {t("form.bundlingName")}
        </Link>
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default BundlingLayout;
