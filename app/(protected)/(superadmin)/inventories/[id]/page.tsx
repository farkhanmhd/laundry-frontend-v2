import { TabsContent } from "@/components/ui/tabs";
import { ImageForm } from "../components/image-form";
import { InventoryDataForm } from "../components/inventory-data-form";
import { StockAdjustmentForm } from "../components/stock-adjustment-form";
import { getInventoryById } from "../data";

type Props = {
  params: Promise<{ id: string }>;
};

const InventoryDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const inventory = await getInventoryById(id);
  return (
    <>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="inventory"
      >
        <InventoryDataForm
          description={inventory?.description as string}
          id={id}
          name={inventory?.name as string}
          price={inventory?.price as number}
          safetyStock={inventory?.safetyStock as number}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="image"
      >
        <ImageForm
          id={inventory?.id as string}
          src={inventory?.image as string}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="stock"
      >
        <StockAdjustmentForm
          currentQuantity={inventory?.stock as number}
          id={inventory?.id as string}
        />
      </TabsContent>
    </>
  );
};

export default InventoryDetailPage;
