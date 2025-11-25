"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Member } from "../data";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("points")}
      </div>
    ),
  },
];
