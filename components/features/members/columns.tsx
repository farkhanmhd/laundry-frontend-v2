"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/components/utils/client";
import type { MemberWithSpending } from "@/lib/modules/member-reports/data";
import { formatDate, formatToIDR } from "@/lib/utils";

export const memberSpendingColumns: ColumnDef<MemberWithSpending>[] = [
  {
    accessorKey: "name",
    header: "Member Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
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
    header: "Orders",
    cell: ({ row }) => (
      <div className="font-medium text-sm">{row.getValue("orderCount")}</div>
    ),
  },
  {
    accessorKey: "totalSpending",
    header: "Total Spending",
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
    header: "Avg. Spending",
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
