import { notFound } from "next/navigation";
import { InventoryDataForm } from "@/components/features/inventories/inventory-data-form";
import { InventoryImageForm } from "@/components/features/inventories/inventory-image-form";
import { InventoryRestockForm } from "@/components/features/inventories/inventory-restock-form";
import { StockAdjustmentForm } from "@/components/features/inventories/stock-adjustment-form";
import { TabsContent } from "@/components/ui/tabs";
import { InventoriesApi } from "@/lib/modules/inventories/data";

type Props = {
  params: Promise<{ id: string }>;
};

const InventoryDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const inventory = await InventoriesApi.getInventoryById(id);

  if (!inventory) {
    notFound();
  }

  return (
    <>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="inventory"
      >
        <InventoryDataForm
          description={inventory.description}
          id={inventory.id}
          name={inventory.name}
          price={inventory.price}
          safetyStock={inventory.safetyStock}
          unit={inventory.unit ?? "pieces"}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="image"
      >
        <InventoryImageForm id={inventory.id} src={inventory.image as string} />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="stock"
      >
        <StockAdjustmentForm
          currentQuantity={inventory.stock}
          id={inventory.id}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="restock"
      >
        <InventoryRestockForm
          currentQuantity={inventory.stock}
          id={inventory.id}
        />
      </TabsContent>
    </>
  );
};

export default InventoryDetailPage;
