"use client";

import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing marker icons in Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  initialPosition?: [number, number];
  onLocationSelect: (lat: number, lng: number) => void;
}

// 1. Pass onLocationSelect down to the Marker component
function LocationMarker({
  position,
  setPosition,
  onLocationSelect,
}: {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      // 2. Update local visual state
      setPosition([lat, lng]);

      // 3. Update Parent IMMEDIATELY (No useEffect needed)
      onLocationSelect(lat, lng);

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
  const defaultCenter: [number, number] = [-6.2088, 106.8456];

  // Local state is only for showing the marker visually
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition || null
  );

  // 4. DELETED the useEffect block entirely.
  // This prevents the infinite loop when the parent re-renders.

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
        <LocationMarker
          onLocationSelect={onLocationSelect}
          position={position}
          setPosition={setPosition} // Pass the prop down
        />
      </MapContainer>
      <p className="mt-2 text-muted-foreground text-xs">
        * Click on the map to pin the location.
      </p>
    </div>
  );
}
