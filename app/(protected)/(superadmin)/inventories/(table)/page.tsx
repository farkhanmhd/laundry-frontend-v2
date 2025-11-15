import { TableView } from "@/components/table/table-view";
import { getInventories } from "../data";

const ProductsPage = async () => {
  const data = await getInventories();

  return <TableView data={data} />;
};

export default ProductsPage;
