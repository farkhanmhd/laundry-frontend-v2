import { TabsContent } from "@/components/ui/tabs";
import { ImageForm } from "../components/image-form";
import { InventoryDataForm } from "../components/inventory-data-form";
import { StockAdjustmentForm } from "../components/stock-adjustment-form";
import { getInventoryById, type Inventory } from "../data";

type Props = {
  params: Promise<{ id: string }>;
};

const InventoryDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const inventory = (await getInventoryById(id)) as Inventory;
  return (
    <>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="inventory"
      >
        <InventoryDataForm
          description={inventory.description}
          id={id}
          name={inventory.name}
          price={inventory.price}
          safetyStock={inventory.safetyStock}
          unit={inventory.unit}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="image"
      >
        <ImageForm id={inventory.id} src={inventory.image as string} />
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
    </>
  );
};

export default InventoryDetailPage;
