import { format, startOfMonth } from "date-fns";
import {
  ActiveMembersCard,
  AverageOrderValueCard,
  TotalCustomersCard,
  TotalMemberOrdersCard,
} from "@/components/features/members/member-reports-cards-data";
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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <TotalCustomersCard />
      <ActiveMembersCard query={query} />
      <TotalMemberOrdersCard query={query} />
      <AverageOrderValueCard query={query} />
    </div>
  );
};

export default MemberReportCards;
