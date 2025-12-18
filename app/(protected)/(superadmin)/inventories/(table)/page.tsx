import { TableView } from "@/components/table/table-view";
import { getInventories } from "@/lib/modules/inventories/data";

const ProductsPage = async () => {
  const data = await getInventories();

  return <TableView data={data} />;
};

export default ProductsPage;
