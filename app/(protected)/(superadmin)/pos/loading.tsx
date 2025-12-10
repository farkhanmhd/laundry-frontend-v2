import { MapItems } from "@/lib/utils";
import { PosItemSkeleton } from "./pos-item-skeleton";

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
