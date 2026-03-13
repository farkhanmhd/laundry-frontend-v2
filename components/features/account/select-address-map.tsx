"use client";

import { MapProvider } from "@/components/maps/map-provider";
import { AddressMap } from "./address-map";

export function SelectAddAdressMap() {
  return (
    <div className="w-full">
      <MapProvider>
        <AddressMap />
      </MapProvider>
    </div>
  );
}
