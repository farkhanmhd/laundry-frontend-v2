import { InventoriesApi } from "@/lib/modules/inventories/data";
import { InventoryTableClient } from "./inventory-table-client";

const InventoryTable = async () => {
  const data = await InventoriesApi.getInventories();
  return <InventoryTableClient data={data || []} />;
};

export default InventoryTable;
