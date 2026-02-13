import { UpdateUserRoleDialog } from "@/components/features/users/user-role-dialog";
import { TableView } from "@/components/table/table-view";
import { UsersApi } from "@/lib/modules/users/data";
import { getSearchQuery, type SearchQueryProps } from "@/lib/search-params";

const UsersPage = async (props: SearchQueryProps) => {
  const query = await getSearchQuery(props);
  const data = await UsersApi.getUsers(query);

  return (
    <>
      <TableView data={data?.users} total={data?.total} />
      <UpdateUserRoleDialog />
    </>
  );
};

export default UsersPage;
