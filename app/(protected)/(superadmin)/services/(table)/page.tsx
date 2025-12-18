import { TableView } from "@/components/table/table-view";
import { getServices } from "@/lib/modules/services/data";

const ProductsPage = async () => {
  const services = await getServices();
  return <TableView data={services} />;
};

export default ProductsPage;
