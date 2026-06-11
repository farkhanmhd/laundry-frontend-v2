import { TableView } from "@/components/table/table-view";
import { AssetsApi } from "@/lib/modules/assets/data";

const AssetsPage = async () => {
  const data = await AssetsApi.getAssets();
  return <TableView data={data?.assets} total={data?.total} />;
};

export default AssetsPage;
