"use client";

import { MapPin } from "lucide-react";
import { LngLat, type MapMouseEvent } from "maplibre-gl";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
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

  useEffect(() => {
    if (!validDistance && draggableMarker.lat !== LAUNDRY_POINT_ZERO[1]) {
      showLocationTooFarToast();
    }
  }, [validDistance, draggableMarker.lat, showLocationTooFarToast]);

  // 2. The new Geolocation Effect
  useEffect(() => {
    // Abort if the map isn't ready OR if an existing location prop was passed in
    if (!(map && isLoaded) || location) {
      return;
    }

    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: The user clicked "Allow"
          const userLng = position.coords.longitude;
          const userLat = position.coords.latitude;

          // Update the marker state
          setDraggableMarker({
            lng: userLng,
            lat: userLat,
          });

          form.setValue("lng", userLng);
          form.setValue("lat", userLat);

          // Tell the map instance to smoothly fly to the new coordinates
          map.flyTo({
            center: [userLng, userLat],
            zoom: 12, // Zoom in closer since we know their exact location
            duration: 2000, // 2 second animation
          });
        },
        (error) => {
          // Error: The user clicked "Block" or the request timed out.
          // We do not need to update the state here, because it already
          // defaulted to LAUNDRY_POINT_ZERO on the initial render.
          console.log(
            "User denied location access. Staying at laundry point. ",
            error
          );
        }
      );
    }
  }, [map, isLoaded, location, form, setDraggableMarker]); // Dependencies ensure this runs at the right time

  useEffect(() => {
    if (location) {
      setDraggableMarker({
        lng: location.lng,
        lat: location.lat,
      });

      form.setValue("lng", location.lng);
      form.setValue("lat", location.lat);
      if (!validDistance) {
        showLocationTooFarToast();
      }
    }
  }, [
    location,
    form,
    setDraggableMarker,
    validDistance,
    showLocationTooFarToast,
  ]);

  useEffect(() => {
    if (!(map && isLoaded)) {
      return;
    }

    const handleMapClick = (e: MapMouseEvent) => {
      const newLng = e.lngLat.lng;
      const newLat = e.lngLat.lat;
      setDraggableMarker({ lng: newLng, lat: newLat });
      form.setValue("lng", newLng);
      form.setValue("lat", newLat);

      const clickedDestination = new LngLat(newLng, newLat);
      const clickedDistance = (
        origin.distanceTo(clickedDestination) / 1000
      ).toFixed(2);

      if (Number(clickedDistance) > 2) {
        showLocationTooFarToast();
      }
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [
    map,
    isLoaded,
    setDraggableMarker,
    form,
    origin,
    showLocationTooFarToast,
  ]);

  const handleLocate = (coords: { longitude: number; latitude: number }) => {
    const newLng = coords.longitude;
    const newLat = coords.latitude;

    setDraggableMarker({ lng: newLng, lat: newLat });

    form.setValue("lng", newLng);
    form.setValue("lat", newLat);

    const locatedDestination = new LngLat(newLng, newLat);
    const locatedDistance = (
      origin.distanceTo(locatedDestination) / 1000
    ).toFixed(2);

    if (Number(locatedDistance) > 2) {
      showLocationTooFarToast();
    }
  };

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
        onDragEnd={(lngLat) => {
          const newLng = lngLat.lng;
          const newLat = lngLat.lat;
          setDraggableMarker({ lng: newLng, lat: newLat });
          const draggedDestination = new LngLat(newLng, newLat);
          const draggedDistance = (
            origin.distanceTo(draggedDestination) / 1000
          ).toFixed(2);
          if (Number(draggedDistance) > 2) {
            showLocationTooFarToast();
          }
        }}
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
