"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useVoucherColumns } from "@/components/features/vouchers/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VoucherLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Vouchers");
  const columns = useVoucherColumns();

  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <Link
          className={cn(buttonVariants(), "rounded-none")}
          href="/vouchers/new"
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

export default VoucherLayout;
