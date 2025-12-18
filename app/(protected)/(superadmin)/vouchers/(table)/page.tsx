import { TableView } from "@/components/table/table-view";
import { getVouchers } from "@/lib/modules/vouchers/data";

const ProductsPage = async () => {
  const vouchers = await getVouchers();
  return <TableView data={vouchers} />;
};

export default ProductsPage;
