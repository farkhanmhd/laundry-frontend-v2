import type { Metadata } from "next";
import MemberSpendingTable from "@/components/features/member-reports/member-spending-table";
import { getSearchQuery, type SearchQuery } from "@/lib/search-params";
import type { DateRangeSearchParams } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Member Reports",
};

interface MemberReportsPageProps {
  searchParams: Promise<DateRangeSearchParams & SearchQuery>;
}

export default async function MemberReportsPage(props: MemberReportsPageProps) {
  const searchQuery = await getSearchQuery(props);
  return <MemberSpendingTable query={searchQuery} />;
}
