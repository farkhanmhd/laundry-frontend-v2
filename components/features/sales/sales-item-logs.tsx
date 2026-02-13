import { type BestSellersQuery, SalesApi } from "@/lib/modules/sales/data";
import { SalesByItemTable } from "./sales-by-item-table";

interface Props {
  query: BestSellersQuery;
}

const SalesItemLogs = async ({ query }: Props) => {
  const data = await SalesApi.getItemLogs(query);

  return <SalesByItemTable data={data} />;
};

export default SalesItemLogs;
