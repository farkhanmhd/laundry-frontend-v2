import { TableView } from "@/components/table/table-view";
import { VouchersApi } from "@/lib/modules/vouchers/data";

const ProductsPage = async () => {
  const vouchers = await VouchersApi.getVouchers();
  return <TableView data={vouchers} />;
};

export default ProductsPage;
