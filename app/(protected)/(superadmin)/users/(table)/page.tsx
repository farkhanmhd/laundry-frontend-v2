import { TableView } from "@/components/table/table-view";
import { getUsers } from "@/lib/modules/users/data";
import { getSearchQuery, type SearchQueryProps } from "@/lib/search-params";

const UsersPage = async (props: SearchQueryProps) => {
  const query = await getSearchQuery(props);
  const data = await getUsers(query);

  return <TableView data={data?.users} total={data?.total} />;
};

export default UsersPage;
