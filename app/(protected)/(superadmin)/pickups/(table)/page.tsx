import { TableView } from "@/components/table/table-view";
import { PickupsApi } from "@/lib/modules/deliveries/data";
import { getSearchQuery, type SearchQueryProps } from "@/lib/search-params";

const Page = async (props: SearchQueryProps) => {
  const query = await getSearchQuery(props);
  const data = await PickupsApi.getPickups(query);
  return <TableView data={data} />;
};

export default Page;
