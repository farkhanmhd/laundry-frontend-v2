import { PosProductCard } from "@/components/features/pos/pos-product-card";
import { MapItems } from "@/lib/utils";
import { getInventories } from "../inventories/data";

const PosPage = async () => {
  const data = await getInventories();

  return (
    <MapItems
      of={data || []}
      render={(item) => (
        <li key={item.id}>
          <PosProductCard product={item} />
        </li>
      )}
    />
  );
};

export default PosPage;
