import { TableView } from "@/components/table/table-view";
import { getProducts } from "../data";

const ProductsPage = async () => {
  const data = await getProducts();

  return <TableView data={data} />;
};

export default ProductsPage;
