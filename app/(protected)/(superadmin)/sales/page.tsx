import { format, startOfMonth } from "date-fns";
import { SalesByOrder } from "@/components/features/sales/sales-by-order";
import SalesOverview from "@/components/features/sales/sales-overview";
import type {
  BestSellersQuery,
  SalesByOrderQuery,
} from "@/lib/modules/sales/data";
import { getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<BestSellersQuery & SalesByOrderQuery>;
}

const TablePage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const dateRange = getDateRange({
    from: searchParams.from,
    to: searchParams.to,
  });

  const bestSellersQuery: BestSellersQuery = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
    page: searchParams.page ?? 1,
    rows: searchParams.rows ?? 50,
    item_id: searchParams.item_id || undefined,
    item_type: searchParams.item_type || undefined,
  };

  const salesByOrderQuery: SalesByOrderQuery = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
    page: searchParams.page ?? 1,
    rows: searchParams.rows ?? 50,
    payment_type: searchParams.payment_type || undefined,
  };

  return (
    <>
      <SalesOverview query={bestSellersQuery} />
      <SalesByOrder query={salesByOrderQuery} />
    </>
  );
};

export default TablePage;
