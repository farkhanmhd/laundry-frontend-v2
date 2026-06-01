import { DateRangePicker } from "@/components/date/date-range-picker";
import type { SearchQuery } from "@/lib/search-params";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams & SearchQuery>;
}

const SalesHeader = async (props: Props) => {
  const searchParams = await props.searchParams;
  const dateRange = getDateRange(searchParams);
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full space-y-2">
        <h1 className="font-semibold text-2xl">Member</h1>
      </div>
      <div className="flex w-full items-center gap-3 md:w-sm">
        <DateRangePicker dateRange={dateRange} />
      </div>
    </div>
  );
};

export default SalesHeader;
