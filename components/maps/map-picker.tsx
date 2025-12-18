"use client";

import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  initialPosition?: [number, number]; // [lat, lng]
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
}) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker icon={defaultIcon} position={position} />
  );
}

export default function MapPicker({
  initialPosition,
  onLocationSelect,
}: MapPickerProps) {
  // Default to Jakarta (or your user's default locale) if no position provided
  const defaultCenter: [number, number] = [-6.2088, 106.8456];
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition || null
  );

  useEffect(() => {
    if (position) {
      onLocationSelect(position[0], position[1]);
    }
  }, [position, onLocationSelect]);

  return (
    <div className="z-0 h-[300px] w-full overflow-hidden rounded-md border">
      <MapContainer
        center={initialPosition || defaultCenter}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <p className="mt-2 text-muted-foreground text-xs">
        * Click on the map to pin the location.
      </p>
    </div>
  );
}
