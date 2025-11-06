import { TableView } from "@/components/table/table-view";
import { getVouchers } from "../data";

const ProductsPage = async () => {
  const vouchers = await getVouchers();
  return <TableView data={vouchers} />;
};

export default ProductsPage;
