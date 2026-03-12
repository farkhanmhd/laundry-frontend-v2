"use client";

import { MapPin } from "lucide-react";
import { LngLat, type MapMouseEvent } from "maplibre-gl";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { LAUNDRY_POINT_ZERO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAddressFormContext } from "../features/account/address-form-context";
import {
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "../ui/map";

type AddressMapProps = {
  location?: { lat: number; lng: number };
};

export const AddressMap = ({ location }: AddressMapProps) => {
  const t = useTranslations("AccountSettings.addresses");
  const {
    form,
    draggableMarker,
    setDraggableMarker,
    validDistance,
    distanceInKm,
    origin,
  } = useAddressFormContext();
  const { map, isLoaded } = useMap();

  const showLocationTooFarToast = useCallback(() => {
    toast.error(t("distanceTooFar"));
  }, [t]);

  // Single source of truth for updating marker + form values + distance validation
  const applyLocation = useCallback(
    (lng: number, lat: number) => {
      setDraggableMarker({ lng, lat });
      form.setValue("lng", lng);
      form.setValue("lat", lat);

      const distanceKm = origin.distanceTo(new LngLat(lng, lat)) / 1000;
      if (distanceKm > 2) {
        showLocationTooFarToast();
      }
    },
    [origin, showLocationTooFarToast, form, setDraggableMarker]
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

  // Effect 2: Fly to location once map is ready
  useEffect(() => {
    if (!(location && map && isLoaded)) {
      return;
    }

    map.flyTo({
      center: [location.lng, location.lat],
      zoom: 12,
      duration: 2000,
    });
  }, [map, isLoaded, location]);

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
    },
    [applyLocation]
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
        latitude={LAUNDRY_POINT_ZERO[1]}
        longitude={LAUNDRY_POINT_ZERO[0]}
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
