import { format, startOfMonth } from "date-fns";
import {
  AverageValueCard,
  GrossRevenueCard,
  NetRevenueCard,
  TransactionCountCard,
} from "@/components/features/sales/sales-cards-data";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams>;
}

const SalesCards = async (props: Props) => {
  const searchParams = await props.searchParams;
  const dateRange = getDateRange(searchParams);
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <GrossRevenueCard query={query} />
      <NetRevenueCard query={query} />
      <AverageValueCard query={query} />
      <TransactionCountCard query={query} />
    </div>
  );
};

export default SalesCards;
