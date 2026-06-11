"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAssetColumns } from "@/components/features/assets/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AssetLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Assets");
  const columns = useAssetColumns();

  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <Link
          className={cn(buttonVariants(), "rounded-none")}
          href="/assets/new"
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

export default AssetLayout;
