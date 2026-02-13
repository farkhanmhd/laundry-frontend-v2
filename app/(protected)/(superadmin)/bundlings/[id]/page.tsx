import { BundlingDataForm } from "@/components/features/bundlings/bundling-data-form";
import { BundlingImageForm } from "@/components/features/bundlings/bundling-image-form";
import { BundlingItemTab } from "@/components/features/bundlings/bundling-item-tab";
import type { SelectOption } from "@/components/forms/form-select";
import { TabsContent } from "@/components/ui/tabs";
import { type Bundling, BundlingsApi } from "@/lib/modules/bundlings/data";
import type { BundlingItem } from "@/lib/modules/bundlings/schema";
import { InventoriesApi } from "@/lib/modules/inventories/data";
import { ServicesApi } from "@/lib/modules/services/data";

type Props = {
  params: Promise<{ id: string }>;
};

const InventoryDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const bundling = (await BundlingsApi.getBundlingById(id)) as Bundling;
  const [services, inventories] = await Promise.all([
    ServicesApi.getServices(),
    InventoriesApi.getInventories(),
  ]);

  const serviceOptions = services?.map((service) => ({
    label: service.name,
    value: service.id,
  })) as SelectOption[];

  const inventoryOptions = inventories?.map((inventory) => ({
    label: inventory.name,
    value: inventory.id,
  })) as SelectOption[];

  return (
    <>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="data"
      >
        <BundlingDataForm
          description={bundling.description as string}
          id={bundling.id}
          name={bundling.name}
          price={bundling.price}
        />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="image"
      >
        <BundlingImageForm id={bundling.id} src={bundling.image as string} />
      </TabsContent>
      <TabsContent
        className="data-[state=inactive]:hidden"
        forceMount
        value="items"
      >
        <BundlingItemTab
          bundlingId={id}
          inventories={inventoryOptions}
          items={bundling.items as BundlingItem[]}
          services={serviceOptions}
        />
      </TabsContent>
    </>
  );
};

export default InventoryDetailPage;
