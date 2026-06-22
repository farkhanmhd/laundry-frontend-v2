import { InventoryTableClient } from "@/components/features/inventories/inventory-table-client";
import { InventoriesApi } from "@/lib/modules/inventories/data";

export const InventoryContent = async () => {
  const data = await InventoriesApi.getInventories();
  return <InventoryTableClient data={data || []} />;
};
