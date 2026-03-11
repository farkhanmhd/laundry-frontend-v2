"use client";

import { AddressMap } from "./address-map";
import { MapProvider } from "./map-provider";

export function SelectAdressMap() {
  return (
    <div className="w-full">
      <MapProvider>
        <AddressMap />
      </MapProvider>
    </div>
  );
}
