import { type BestSellersQuery, SalesApi } from "@/lib/modules/sales/data";
import { SalesByOrderTable } from "./sales-by-order-table";

interface Props {
  query: BestSellersQuery;
}

export const SalesByOrder = async ({ query }: Props) => {
  const data = await SalesApi.getSalesByOrders(query);

  return <SalesByOrderTable data={data} />;
};
