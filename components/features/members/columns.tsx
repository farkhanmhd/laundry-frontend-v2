"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Client } from "@/components/utils/client";
import type { MemberWithSpending } from "@/lib/modules/member-reports/data";
import { formatDate, formatToIDR } from "@/lib/utils";

export const memberSpendingColumns: ColumnDef<MemberWithSpending>[] = [
  {
    accessorKey: "name",
    header: () => {
      const t = useTranslations("Members.columns");
      return t("memberName");
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => {
      const t = useTranslations("Members.columns");
      return t("phone");
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "joinDate",
    header: () => {
      const t = useTranslations("Members.columns");
      return t("joinDate");
    },
    cell: ({ row }) => {
      const joinDate = row.getValue("joinDate") as string | null;
      return (
        <div className="text-muted-foreground text-sm">
          {joinDate ? formatDate(joinDate) : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "orderCount",
    header: () => {
      const t = useTranslations("Members.columns");
      return t("orders");
    },
    cell: ({ row }) => (
      <div className="font-medium text-sm">{row.getValue("orderCount")}</div>
    ),
  },
  {
    accessorKey: "totalSpending",
    header: () => {
      const t = useTranslations("Members.columns");
      return t("totalSpending");
    },
    cell: ({ row }) => {
      const amount = formatToIDR(Number(row.getValue("totalSpending")));
      return (
        <div className="font-medium text-accent-foreground">
          <Client>{amount}</Client>
        </div>
      );
    },
  },
  {
    accessorKey: "averageSpending",
    header: () => {
      const t = useTranslations("Members.columns");
      return t("averageSpending");
    },
    cell: ({ row }) => {
      const amount = formatToIDR(row.getValue("averageSpending"));
      return (
        <div className="text-muted-foreground text-sm">
          <Client>{amount}</Client>
        </div>
      );
    },
  },
];
