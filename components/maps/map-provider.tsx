import { Map as MapContainer } from "@/components/ui/map";
import { cn } from "@/lib/utils";

type MapProviderProps = {
  children: React.ReactNode;
  center?: [number, number];
  className?: string;
};

export const MapProvider = ({
  children,
  center,
  className,
}: MapProviderProps) => {
  return (
    <div className={cn("h-100 w-full", className)}>
      <MapContainer center={center} zoom={12}>
        {children}
      </MapContainer>
    </div>
  );
};
