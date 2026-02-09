import { format, startOfMonth } from "date-fns";
import { SalesChart } from "@/components/features/sales/sales-chart";
import { SalesApi } from "@/lib/modules/sales/data";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams>;
}

const SalesChartPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const dateRange = getDateRange(searchParams);
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };

  const data = await SalesApi.getChartData(query);

  return <SalesChart data={data} />;
};

export default SalesChartPage;
