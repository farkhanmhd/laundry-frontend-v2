import { format, startOfMonth } from "date-fns";
import type { Metadata } from "next";
import MemberSpendingTable from "@/components/features/members/member-spending-table";
import { getSearchQuery, type SearchQuery } from "@/lib/search-params";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Member Reports",
};

interface MemberReportsPageProps {
  searchParams: Promise<DateRangeSearchParams & SearchQuery>;
}

export default async function MemberReportsPage(props: MemberReportsPageProps) {
  const searchQuery = await getSearchQuery(props);
  const dateRange = getDateRange(await props.searchParams);

  const query = {
    ...searchQuery,
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };

  return <MemberSpendingTable query={query} />;
}
