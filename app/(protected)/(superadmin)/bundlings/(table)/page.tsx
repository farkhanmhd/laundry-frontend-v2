import { TableView } from "@/components/table/table-view";
import { BundlingsApi } from "@/lib/modules/bundlings/data";

const BundlingsPage = async () => {
  const data = await BundlingsApi.getBundlings();

  return <TableView data={data} />;
};

export default BundlingsPage;
