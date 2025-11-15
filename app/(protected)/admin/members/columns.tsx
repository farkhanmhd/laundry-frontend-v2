"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export interface Member {
  id: string;
  name: string;
  phone: string;
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  joinedAt: string;
}

export const membersColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member ID" />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "tier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tier" />
    ),
    cell: ({ row }) => {
      const tier = row.getValue("tier") as string;
      const variants = {
        bronze: "outline",
        silver: "secondary",
        gold: "default",
        platinum: "default",
      } as const;
      return (
        <Badge variant={variants[tier as keyof typeof variants]}>
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("points")} pts</div>
    ),
  },
  {
    accessorKey: "joinedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedAt") as string);
      return <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>;
    },
  },
];
