"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useServiceColumns } from "@/components/features/services/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { AuthorizedComponent } from "@/components/utils/authorized-component";
import { cn } from "@/lib/utils";

const ServicesLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Services");
  const columns = useServiceColumns();
  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <AuthorizedComponent requiredRole="superadmin">
          <Link
            className={cn(buttonVariants(), "rounded-none")}
            href="/services/new"
          >
            <Plus />
            {t("form.serviceName")}
          </Link>
        </AuthorizedComponent>
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default ServicesLayout;
