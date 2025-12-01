import { TabsContent } from "@/components/ui/tabs";
import { BundlingDataForm } from "../components/bundling-data-form";
import { type Bundling, getBundlingById } from "../data";

type Props = {
  params: Promise<{ id: string }>;
};

const InventoryDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const bundling = (await getBundlingById(id)) as Bundling;
  return (
    <TabsContent
      className="data-[state=inactive]:hidden"
      forceMount
      value="data"
    >
      <BundlingDataForm
        description={bundling.description as string}
        id={bundling.id}
        isActive={bundling.isActive as boolean}
        name={bundling.name}
        price={bundling.price}
      />
    </TabsContent>
  );
};

export default InventoryDetailPage;
