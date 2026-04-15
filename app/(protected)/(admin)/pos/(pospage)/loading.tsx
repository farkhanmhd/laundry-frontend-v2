import { PosItemSkeleton } from "@/components/features/pos/pos-item-skeleton";
import { MapItems } from "@/lib/utils";

const Loading = () => (
  <MapItems
    of={Array.from({ length: 8 })}
    render={(_, index) => (
      <li key={`item-${index}`}>
        <PosItemSkeleton />
      </li>
    )}
  />
);

export default Loading;
