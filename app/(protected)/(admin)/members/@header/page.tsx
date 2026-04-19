import { format, startOfMonth } from "date-fns";
import { getTranslations } from "next-intl/server";
import { DateRangePicker } from "@/components/date/date-range-picker";
import { MembersSpendingExport } from "@/components/features/members/member-spending-export";
import type { SearchQuery } from "@/lib/search-params";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams & SearchQuery>;
}

const SalesHeader = async (props: Props) => {
  const searchParams = await props.searchParams;
  const t = await getTranslations("Members");
  const dateRange = getDateRange(searchParams);
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
    rows: searchParams.rows ?? 50,
  };
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full space-y-2">
        <h1 className="font-semibold text-2xl"> {t("title")}</h1>
      </div>
      <div className="flex w-full items-center gap-3 md:w-sm">
        <MembersSpendingExport query={query} />
        <DateRangePicker dateRange={dateRange} />
      </div>
    </div>
  );
};

export default SalesHeader;
