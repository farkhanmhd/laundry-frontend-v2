"use client";

import { ExportButton } from "../report/export-button";

interface Props {
  from?: string;
  to?: string;
  inventoryIds?: string[];
}

export function InventoryAdjustmentsExportButton({
  from,
  to,
  inventoryIds,
}: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const params = new URLSearchParams();
  if (from) {
    params.append("from", from);
  }
  if (to) {
    params.append("to", to);
  }
  if (inventoryIds && inventoryIds.length > 0) {
    for (const id of inventoryIds) {
      params.append("inventoryIds", id);
    }
  }

  const href = `${baseUrl}/report/inventory/adjustments?${params.toString()}`;

  return <ExportButton href={href} label="Export" />;
}
