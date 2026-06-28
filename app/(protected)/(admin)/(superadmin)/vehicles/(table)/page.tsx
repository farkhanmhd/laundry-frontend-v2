import { TableView } from "@/components/table/table-view";
import { VehiclesApi } from "@/lib/modules/vehicles/data";

const VehiclesPage = async () => {
  const data = await VehiclesApi.getVehicles();
  return <TableView data={data?.vehicles} total={data?.total} />;
};

export default VehiclesPage;
