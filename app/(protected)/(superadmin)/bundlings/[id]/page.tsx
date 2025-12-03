import type { SelectOption } from "@/components/forms/form-select";
import { TabsContent } from "@/components/ui/tabs";
import { getInventories } from "../../inventories/data";
import { getServices } from "../../services/data";
import { BundlingDataForm } from "../components/bundling-data-form";
import { BundlingItemTab } from "../components/bundling-item-tab";
import { ImageForm } from "../components/image-form";
import { type Bundling, getBundlingById } from "../data";
import type { BundlingItem } from "../schema";

type Props = {
  params: Promise<{ id: string }>;
};

const InventoryDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const bundling = (await getBundlingById(id)) as Bundling;
  const [services, inventories] = await Promise.all([
    getServices(),
    getInventories(),
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
        <ImageForm id={bundling.id} src={bundling.image as string} />
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
