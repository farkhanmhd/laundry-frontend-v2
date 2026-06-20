import { format, startOfMonth } from "date-fns";
import type { Metadata } from "next";
import MemberSpendingTable from "@/components/features/members/member-spending-table";
import type { GetmembersWithSpendingQuery } from "@/lib/modules/member-reports/data";
import { getSearchQuery } from "@/lib/search-params";
import { getDateRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Member Reports",
};

interface MemberReportsPageProps {
  searchParams: Promise<GetmembersWithSpendingQuery>;
}

export default async function MemberReportsPage(props: MemberReportsPageProps) {
  const searchQuery = await getSearchQuery(props);
  const dateRange = getDateRange(await props.searchParams);
  const type = (await props.searchParams).type;

  const query = {
    ...searchQuery,
    type,
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };

  return <MemberSpendingTable query={query} />;
}
