import { TableView } from "@/components/table/table-view";
import { getOrders } from "@/lib/modules/orders/data";
import { getSearchQuery, type SearchQueryProps } from "@/lib/search-params";

const Page = async (props: SearchQueryProps) => {
  const query = await getSearchQuery(props);
  console.log(query);
  const orders = await getOrders();
  return <TableView data={orders} />;
};

export default Page;
