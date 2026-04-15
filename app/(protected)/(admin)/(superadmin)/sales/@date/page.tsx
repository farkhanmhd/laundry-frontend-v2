import { DateRangePicker } from "@/components/date/date-range-picker";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams>;
}

const SalesHeader = async (props: Props) => {
  const searchParams = await props.searchParams;
  const dateRange = getDateRange(searchParams);
  return <DateRangePicker dateRange={dateRange} />;
};

export default SalesHeader;
