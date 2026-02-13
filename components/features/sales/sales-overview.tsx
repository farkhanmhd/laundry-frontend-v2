import { type BestSellersQuery, SalesApi } from "@/lib/modules/sales/data";
import { SalesOverviewTable } from "./sales-overview-table";

interface Props {
  query: BestSellersQuery;
}

const SalesOverview = async ({ query }: Props) => {
  const data = await SalesApi.getBestSellers(query);

  return <SalesOverviewTable data={data} />;
};

export default SalesOverview;
