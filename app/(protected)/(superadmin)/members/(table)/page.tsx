import { TableView } from "@/components/table/table-view";
import { getMembers } from "@/lib/modules/members/data";
import type { SearchQuery } from "@/lib/search-params";

type Props = {
  searchParams: Promise<{
    rows: string;
    page: string;
    search: string;
  }>;
};

const ProductsPage = async (props: Props) => {
  const searchParams = await props.searchParams;

  const query: SearchQuery = {
    rows: Number(searchParams.rows) || 50,
    search: searchParams.search || "",
    page: Number(searchParams.page) || 1,
  };

  const data = await getMembers(query);

  return <TableView data={data?.members} total={data?.total} />;
};

export default ProductsPage;
