import { DateRangePicker } from "@/components/date/date-range-picker";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams>;
}

const SalesHeader = async (props: Props) => {
  const searchParams = await props.searchParams;
  const dateRange = getDateRange(searchParams);
  return (
    <div className="w-full md:w-sm" key="date">
      <DateRangePicker dateRange={dateRange} />
    </div>
  );
};

export default SalesHeader;
