"use client";

import { ExportButton } from "../report/export-button";

interface Props {
  from?: string;
  to?: string;
}

export function InventoryUsageExportButton({ from, to }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Construct the URL with query parameters
  const params = new URLSearchParams();
  if (from) {
    params.append("from", from);
  }
  if (to) {
    params.append("to", to);
  }

  const href = `${baseUrl}/report/inventory/usage?${params.toString()}`;

  return <ExportButton href={href} label="Export" />;
}
