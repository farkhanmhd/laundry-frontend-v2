"use client";

import { useAddressFormContext } from "../features/account/address-form-context";
import { AddressMap } from "./address-map";
import { MapProvider } from "./map-provider";

export function SelectAdressMap() {
  const { address } = useAddressFormContext();
  const location = address ? { lng: address.lng, lat: address.lat } : undefined;
  return (
    <div className="w-full">
      <MapProvider>
        <AddressMap location={location} />
      </MapProvider>
    </div>
  );
}
