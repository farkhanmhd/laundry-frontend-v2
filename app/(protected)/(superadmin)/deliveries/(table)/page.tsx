import { TableView } from "@/components/table/table-view";
import { DeliveriesApi } from "@/lib/modules/deliveries/data";
import { getSearchQuery, type SearchQueryProps } from "@/lib/search-params";

const Page = async (props: SearchQueryProps) => {
  const query = await getSearchQuery(props);
  const data = await DeliveriesApi.getDeliveries(query);
  return <TableView data={data} />;
};

export default Page;
