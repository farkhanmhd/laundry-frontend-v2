import { PosItemCard } from "@/components/features/pos/pos-item-card";
import { MapItems } from "@/lib/utils";
import { getPosItems } from "./data";

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
