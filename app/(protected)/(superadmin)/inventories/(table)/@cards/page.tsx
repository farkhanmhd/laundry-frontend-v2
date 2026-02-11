import { format, startOfMonth } from "date-fns";
import { Suspense } from "react";
import { InventoryLowStockAlert } from "@/components/features/inventory-reports/inventory-low-stock-alert";
import { InventoryLowStockAlertSkeleton } from "@/components/features/inventory-reports/inventory-low-stock-alert-skeleton";
import {
  AverageUsageCard,
  TotalItemsCard,
  TotalUsageCard,
} from "@/components/features/inventory-reports/inventory-reports-cards";
import type { MemberReportsQuery } from "@/lib/modules/member-reports/data";
import type { SearchQuery } from "@/lib/search-params";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface MemberReportsPageProps {
  searchParams: Promise<DateRangeSearchParams & SearchQuery>;
}

const MemberReportCards = async (props: MemberReportsPageProps) => {
  const params = await props.searchParams;

  // Prepare query for components that need date range
  const dateRange = getDateRange({
    from: params.from,
    to: params.to,
  });
  const query: MemberReportsQuery = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };
  return (
    <div className="space-y-6">
      <Suspense fallback={<InventoryLowStockAlertSkeleton />}>
        <InventoryLowStockAlert />
      </Suspense>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <TotalItemsCard />
        <TotalUsageCard query={query} />
        <AverageUsageCard query={query} />
      </div>
    </div>
  );
};

export default MemberReportCards;
