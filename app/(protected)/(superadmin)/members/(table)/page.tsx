import { TableView } from "@/components/table/table-view";
import type { SearchQuery } from "@/lib/search-params";
import { getMembers } from "../data";

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
