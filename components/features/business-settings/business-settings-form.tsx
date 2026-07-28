"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import type { MapMouseEvent } from "maplibre-gl";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  Map as MapContainer,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map";
import { Textarea } from "@/components/ui/textarea";
import { LAUNDRY_POINT_ZERO } from "@/lib/constants";
import {
  BusinessSettingsApi,
  type BusinessSettingsInput,
} from "@/lib/modules/business-settings/data";
import { toastResponse } from "@/lib/toast-helper";

const businessSettingsSchema = z.object({
  address: z.string().min(1, "Validation.required"),
  latitude: z.string().min(1, "Validation.required"),
  longitude: z.string().min(1, "Validation.required"),
  maxDistanceKm: z.string().min(1, "Validation.required"),
});

type BusinessSettingsFormValues = z.infer<typeof businessSettingsSchema>;

type MapSectionProps = {
  form: ReturnType<typeof useForm<BusinessSettingsFormValues>>;
};

const MapSection = ({ form }: MapSectionProps) => {
  const { map, isLoaded } = useMap();
  const latStr = form.watch("latitude");
  const lngStr = form.watch("longitude");
  const lat = Number(latStr);
  const lng = Number(lngStr);
  const hasLocation = !!latStr && !!lngStr;

  const applyLocation = useCallback(
    async (newLng: number, newLat: number) => {
      form.setValue("latitude", newLat.toString(), { shouldDirty: true });
      form.setValue("longitude", newLng.toString(), { shouldDirty: true });
      try {
        const response = await fetch(
          `https://router.project-osrm.org/nearest/v1/driving/${newLng},${newLat}`
        );
        if (response.ok) {
          const data = await response.json();
          const streetName: string = data.waypoints?.[0]?.name;
          if (streetName && streetName !== "") {
            form.setValue("address", streetName, { shouldDirty: true });
          }
        }
      } catch (error) {
        console.error("Failed to fetch address from OSRM:", error);
      }
    },
    [form]
  );

  useEffect(() => {
    if (!(map && isLoaded) || hasLocation) {
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
          zoom: 15,
          duration: 2000,
        });
      },
      () => {
        console.log("Geolocation permission denied");
      }
    );
  }, [map, isLoaded, hasLocation, applyLocation]);

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
        zoom: 15,
        duration: 2000,
      });
    },
    [applyLocation, map]
  );

  const markerLat = hasLocation ? lat : LAUNDRY_POINT_ZERO[1];
  const markerLng = hasLocation ? lng : LAUNDRY_POINT_ZERO[0];

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
        latitude={markerLat}
        longitude={markerLng}
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
            <p className="text-muted-foreground text-xs">
              {markerLat.toFixed(4)}, {markerLng.toFixed(4)}
            </p>
          </div>
        </MarkerPopup>
      </MapMarker>
    </>
  );
};

export const BusinessSettingsForm = () => {
  const t = useTranslations("BusinessSettings");
  const tValidation = useTranslations("Validation");
  const tNotifications = useTranslations("Notifications");
  const queryClient = useQueryClient();

  const form = useForm<BusinessSettingsFormValues>({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: {
      address: "",
      latitude: "",
      longitude: "",
      maxDistanceKm: "",
    },
    mode: "onSubmit",
  });

  const latStr = form.watch("latitude");
  const lngStr = form.watch("longitude");
  const mapCenter: [number, number] =
    latStr && lngStr ? [Number(lngStr), Number(latStr)] : LAUNDRY_POINT_ZERO;

  const { data: settings, isLoading: isFetching } = useQuery({
    queryKey: ["business-settings"],
    queryFn: async () => {
      const response = await BusinessSettingsApi.get();
      if (response?.status === "success") {
        return response.data;
      }
      return null;
    },
    retry: false,
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        address: settings.address,
        latitude: settings.latitude,
        longitude: settings.longitude,
        maxDistanceKm: settings.maxDistanceKm,
      });
    }
  }, [settings, form]);

  const upsertMutation = useMutation({
    mutationFn: (data: BusinessSettingsInput) =>
      BusinessSettingsApi.upsert(data),
    onSuccess: (result) => {
      if (result.error) {
        const errorValue = result.error.value as
          | { messageKey?: string }
          | undefined;
        toast.error(
          errorValue?.messageKey
            ? toastResponse(tNotifications, {
                messageKey: errorValue.messageKey,
              })
            : tNotifications("common.unexpectedError")
        );
        return;
      }
      const responseData = result.data as
        | { status: string; messageKey?: string; message?: string }
        | undefined;
      if (responseData?.status === "success") {
        toast.success(
          responseData.messageKey
            ? toastResponse(tNotifications, responseData)
            : tNotifications("businessSettings.updated")
        );
        queryClient.invalidateQueries({ queryKey: ["business-settings"] });
      }
    },
    onError: () => {
      toast.error(tNotifications("common.unexpectedError"));
    },
  });

  const onSubmit = (data: BusinessSettingsFormValues) => {
    upsertMutation.mutate(data);
  };

  if (isFetching) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
        <div className="h-96 w-full animate-pulse rounded bg-muted" />
        <div className="h-10 w-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          as={Textarea}
          disabled={upsertMutation.isPending}
          form={form}
          label={t("form.address")}
          name="address"
          placeholder={t("form.addressPlaceholder")}
          tValidation={tValidation}
        />

        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            disabled
            form={form}
            label={t("form.latitude")}
            name="latitude"
            placeholder="0"
            tValidation={tValidation}
          />
          <FormInput
            disabled
            form={form}
            label={t("form.longitude")}
            name="longitude"
            placeholder="0"
            tValidation={tValidation}
          />
          <FormInput
            disabled={upsertMutation.isPending}
            form={form}
            label={t("form.maxDistanceKm")}
            name="maxDistanceKm"
            placeholder="10"
            tValidation={tValidation}
            type="number"
          />
        </div>

        <FieldGroup>
          <div className="h-80 w-full overflow-hidden rounded-lg border md:h-96">
            <MapContainer center={mapCenter} zoom={15}>
              <MapSection form={form} />
            </MapContainer>
          </div>
          <p className="text-muted-foreground text-xs">{t("form.mapHint")}</p>
        </FieldGroup>

        <div className="flex justify-end gap-3">
          <Button
            disabled={upsertMutation.isPending || !form.formState.isDirty}
            type="submit"
          >
            {upsertMutation.isPending ? t("form.saving") : t("form.save")}
          </Button>
        </div>
      </form>
    </div>
  );
};
