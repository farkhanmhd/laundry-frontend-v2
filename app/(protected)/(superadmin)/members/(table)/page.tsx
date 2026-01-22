import { TableView } from "@/components/table/table-view";
import { getMembers } from "@/lib/modules/members/data";
import { getSearchQuery, type SearchQueryProps } from "@/lib/search-params";

const MembersPage = async (props: SearchQueryProps) => {
  const query = await getSearchQuery(props);
  const data = await getMembers(query);

  return <TableView data={data?.members} total={data?.total} />;
};

export default MembersPage;
