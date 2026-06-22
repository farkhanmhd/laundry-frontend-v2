import { notFound } from "next/navigation";
import { InventoryDataForm } from "@/components/features/inventories/inventory-data-form";
import { InventoryImageForm } from "@/components/features/inventories/inventory-image-form";
import InventoryMovementTab from "@/components/features/inventories/inventory-movement-tab";
import { InventoryRestockForm } from "@/components/features/inventories/inventory-restock-form";
import { StockAdjustmentForm } from "@/components/features/inventories/stock-adjustment-form";
import { TabsContent } from "@/components/ui/tabs";
import { InventoriesApi } from "@/lib/modules/inventories/data";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    rows?: number;
    page?: number;
  }>;
};

const InventoryDetailPage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const inventory = await InventoriesApi.getInventoryById(id);
  const { page = 1, rows = 50 } = await searchParams;

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
        <div className="lg:mx-auto lg:max-w-5xl">
          <InventoryDataForm
            description={inventory.description}
            id={inventory.id}
            isCustomerOrderable={inventory.isCustomerOrderable}
            maxWeight={inventory.maxWeight ? Number(inventory.maxWeight) : null}
            name={inventory.name}
            price={inventory.price}
            safetyStock={inventory.safetyStock}
            unit={inventory.unit ?? "pieces"}
          />
        </div>
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="image"
      >
        <div className="lg:mx-auto lg:max-w-5xl">
          <InventoryImageForm
            id={inventory.id}
            name={inventory.name}
            src={inventory.image as string}
          />
        </div>
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="stock"
      >
        <div className="lg:mx-auto lg:max-w-5xl">
          <StockAdjustmentForm
            currentQuantity={inventory.stock}
            id={inventory.id}
            name={inventory.name}
          />
        </div>
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="restock"
      >
        <div className="lg:mx-auto lg:max-w-5xl">
          <InventoryRestockForm
            currentQuantity={inventory.stock}
            id={inventory.id}
            name={inventory.name}
          />
        </div>
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="movement"
      >
        <InventoryMovementTab
          id={inventory.id}
          name={inventory.name}
          page={page}
          rows={rows}
        />
      </TabsContent>
    </>
  );
};

export default InventoryDetailPage;
