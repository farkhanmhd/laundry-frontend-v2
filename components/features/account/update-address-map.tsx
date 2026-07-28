"use client";

import { MapPin } from "lucide-react";
import { LngLat, type MapMouseEvent } from "maplibre-gl";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map";
import { cn } from "@/lib/utils";
import { useUpdateAddressFormContext } from "./update-address-context";

type UpdateAddressMapProps = {
  location: { lat: number; lng: number };
};

export const UpdateAddressMap = ({ location }: UpdateAddressMapProps) => {
  const t = useTranslations("AccountSettings.addresses");
  const {
    form,
    draggableMarker,
    setDraggableMarker,
    validDistance,
    distanceInKm,
    origin,
    maxDistanceKm,
  } = useUpdateAddressFormContext();
  const { map, isLoaded } = useMap();

  const showLocationTooFarToast = useCallback(() => {
    toast.error(t("distanceTooFar", { maxDistance: maxDistanceKm }));
  }, [t, maxDistanceKm]);

  // Single source of truth for updating marker + form values + distance validation
  const applyLocation = useCallback(
    async (lng: number, lat: number) => {
      setDraggableMarker({ lng, lat });
      form.setValue("lng", lng);
      form.setValue("lat", lat);

      const distanceKm = origin.distanceTo(new LngLat(lng, lat)) / 1000;
      if (distanceKm > maxDistanceKm) {
        showLocationTooFarToast();
        return;
      }

      try {
        const response = await fetch(
          `https://router.project-osrm.org/nearest/v1/driving/${lng},${lat}`
        );
        if (response.ok) {
          const data = await response.json();
          const streetName: string = data.waypoints?.[0]?.name;
          if (streetName && streetName !== "") {
            form.setValue("street", streetName);
          }
        }
      } catch (error) {
        console.error("Failed to fetch address from OSRM:", error);
      }
    },
    [origin, showLocationTooFarToast, form, setDraggableMarker, maxDistanceKm]
  );

  // Request browser geolocation on mount (only when no existing location is provided)
  useEffect(() => {
    if (!(map && isLoaded) || location) {
      return;
    }
    if (!("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        applyLocation(coords.longitude, coords.latitude);
        map.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 12,
          duration: 2000,
        });
      },
      (error) => {
        console.log(
          "User denied location access. Staying at laundry point.",
          error
        );
      }
    );
  }, [map, isLoaded, location, applyLocation]);

  // Sync incoming location prop (e.g. editing an existing saved address)
  // useRef guards against infinite loops: applyLocation triggers re-renders which
  // can recreate the callback and re-fire this effect without the guard.
  const appliedLocationRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!location) {
      return;
    }

    if (
      appliedLocationRef.current?.lat === location.lat &&
      appliedLocationRef.current?.lng === location.lng
    ) {
      return;
    }

    appliedLocationRef.current = location;
    applyLocation(location.lng, location.lat);
  }, [location, applyLocation]);

  // Attach map click handler
  useEffect(() => {
    if (!(map && isLoaded)) {
      return;
    }

    const handleMapClick = (e: MapMouseEvent) => {
      applyLocation(e.lngLat.lng, e.lngLat.lat);
    };

    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, isLoaded, applyLocation]);

  const handleLocate = useCallback(
    (coords: { longitude: number; latitude: number }) => {
      applyLocation(coords.longitude, coords.latitude);
      map?.flyTo({
        center: [coords.longitude, coords.latitude],
        zoom: 12,
        duration: 2000,
      });
    },
    [applyLocation, map]
  );

  return (
    <>
      <MapControls
        onLocate={handleLocate}
        position="bottom-right"
        showCompass
        showFullscreen
        showLocate
        showZoom
      />
      <MapMarker
        draggable
        latitude={origin.lat}
        longitude={origin.lng}
      >
        <MarkerContent>
          <div className="cursor-move">
            <MapPin
              className="fill-destructive stroke-white dark:fill-destructive"
              size={28}
            />
          </div>
        </MarkerContent>
        <MarkerPopup>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              {t("laundryLocation")}
            </p>
            <p className="text-muted-foreground text-xs">
              {draggableMarker.lat.toFixed(4)}, {draggableMarker.lng.toFixed(4)}
            </p>
          </div>
        </MarkerPopup>
      </MapMarker>
      <MapMarker
        draggable
        latitude={draggableMarker.lat}
        longitude={draggableMarker.lng}
        onDragEnd={(lngLat) => applyLocation(lngLat.lng, lngLat.lat)}
      >
        <MarkerContent>
          <div className="cursor-move">
            <MapPin
              className="fill-black stroke-white dark:fill-white"
              size={28}
            />
          </div>
        </MarkerContent>
        <MarkerPopup>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              {t("locationDetails")}
            </p>
            <p className="text-muted-foreground text-xs">
              {draggableMarker.lat.toFixed(4)}, {draggableMarker.lng.toFixed(4)}
            </p>
            <p
              className={cn("font-semibold text-xs", {
                "text-destructive": !validDistance,
                "text-primary": validDistance,
              })}
            >
              {t("distance")}: {distanceInKm} km
            </p>
          </div>
        </MarkerPopup>
      </MapMarker>
    </>
  );
};
