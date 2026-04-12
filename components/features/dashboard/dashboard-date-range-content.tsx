"use client";

import { useSearchParams } from "next/navigation";
import { DateRangePicker } from "@/components/date/date-range-picker";
import { getDateRange } from "@/lib/utils";

export function DashboardDateRangeContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const dateRange = getDateRange({ from, to });

  return (
    <div className="w-full md:w-75">
      <DateRangePicker dateRange={dateRange} />
    </div>
  );
}
