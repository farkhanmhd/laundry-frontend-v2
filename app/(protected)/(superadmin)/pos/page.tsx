import { PosItemCard } from "@/components/features/pos/pos-item-card";
import { getPosItems } from "@/lib/modules/pos/data";
import { MapItems } from "@/lib/utils";

const PosPage = async () => {
  const data = await getPosItems();

  return (
    <MapItems
      of={data || []}
      render={(item) => <PosItemCard item={item} key={item.id} />}
    />
  );
};

export default PosPage;
