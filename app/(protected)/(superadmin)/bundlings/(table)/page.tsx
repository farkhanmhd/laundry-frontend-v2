import { TableView } from "@/components/table/table-view";
import { getBundlings } from "../data";

const BundlingsPage = async () => {
  const data = await getBundlings();

  return <TableView data={data} />;
};

export default BundlingsPage;
