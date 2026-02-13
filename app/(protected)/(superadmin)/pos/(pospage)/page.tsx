import { PosItemCard } from "@/components/features/pos/pos-item-card";
import { PosApi, type PosItemData } from "@/lib/modules/pos/data";
import { MapItems } from "@/lib/utils";

const PosPage = async () => {
  const data = (await PosApi.getPosItems()) as PosItemData[] | undefined;
  return (
    <MapItems
      of={data || []}
      render={(item) => (
        <li key={item.id}>
          <PosItemCard item={item} />
        </li>
      )}
    />
  );
};

export default PosPage;
