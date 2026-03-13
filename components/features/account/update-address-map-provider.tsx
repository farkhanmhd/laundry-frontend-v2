"use client";

import { MapProvider } from "@/components/maps/map-provider";
import { useUpdateAddressFormContext } from "./update-address-context";
import { UpdateAddressMap } from "./update-address-map";

export function UpdateAddressMapProvider() {
  const { address } = useUpdateAddressFormContext();
  const location = { lat: address.lat as number, lng: address.lng as number };

  return (
    <div className="w-full">
      <MapProvider>
        <UpdateAddressMap location={location} />
      </MapProvider>
    </div>
  );
}
