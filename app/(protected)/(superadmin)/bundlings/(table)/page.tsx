import { TableView } from "@/components/table/table-view";
import { getBundlings } from "@/lib/modules/bundlings/data";

const BundlingsPage = async () => {
  const data = await getBundlings();

  return <TableView data={data} />;
};

export default BundlingsPage;
