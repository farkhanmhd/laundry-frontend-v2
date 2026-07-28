import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useQuery } from "@tanstack/react-query";
import { LngLat } from "maplibre-gl";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createContext, use, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { LAUNDRY_POINT_ZERO } from "@/lib/constants";
import { addAddressAction } from "@/lib/modules/account/actions";
import type { AccountAddress } from "@/lib/modules/account/data";
import { addressSchema } from "@/lib/modules/account/schema";
import { BusinessSettingsApi } from "@/lib/modules/business-settings/data";
import { toastResponse } from "@/lib/toast-helper";

interface AddAddressFormContextState {
  action: ReturnType<typeof useHookFormAction>["action"];
  form: ReturnType<typeof useHookFormAction>["form"];
  handleSubmitWithAction: ReturnType<
    typeof useHookFormAction
  >["handleSubmitWithAction"];
  handleCancel: () => void;
  onCancel: () => void;
  draggableMarker: {
    lng: number;
    lat: number;
  };
  setDraggableMarker: (coords: { lng: number; lat: number }) => void;
  validDistance: boolean;
  distanceInKm: string;
  origin: LngLat;
  maxDistanceKm: number;
}

const addAddressDefaultValues: AccountAddress = {
  id: Math.random().toString(),
  label: "",
  street: "",
  lat: 0,
  lng: 0,
  note: "",
};

const AddAddressFormContext = createContext<AddAddressFormContextState | null>(
  null
);

type AddressFormProviderProps = {
  children: React.ReactNode;
  onCancel: () => void;
};

export const AddAddressFormProvider = ({
  children,
  onCancel,
}: AddressFormProviderProps) => {
  const { refresh } = useRouter();
  const tNotifications = useTranslations("Notifications");
  const { action, form, handleSubmitWithAction } = useHookFormAction(
    addAddressAction,
    zodResolver(addressSchema),
    {
      formProps: {
        mode: "onChange",
        values: addAddressDefaultValues,
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result?.data?.status === "success") {
            toast.success(toastResponse(tNotifications, result.data));
            onCancel();
            refresh();
          } else {
            toast.error(toastResponse(tNotifications, result?.data || {}));
          }
        },
      },
    }
  );

  const { data: businessSettings } = useQuery({
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

  const storeLat = businessSettings
    ? Number(businessSettings.latitude)
    : LAUNDRY_POINT_ZERO[1];
  const storeLng = businessSettings
    ? Number(businessSettings.longitude)
    : LAUNDRY_POINT_ZERO[0];
  const maxDistanceKm = businessSettings
    ? Number(businessSettings.maxDistanceKm)
    : 2;

  const [draggableMarker, setDraggableMarker] = useState({
    lng: LAUNDRY_POINT_ZERO[0],
    lat: LAUNDRY_POINT_ZERO[1],
  });

  useEffect(() => {
    if (businessSettings) {
      setDraggableMarker({ lng: storeLng, lat: storeLat });
    }
  }, [businessSettings, storeLng, storeLat]);

  const origin = useMemo(
    () => new LngLat(storeLng, storeLat),
    [storeLng, storeLat]
  );

  const destination = useMemo(
    () => new LngLat(draggableMarker.lng, draggableMarker.lat),
    [draggableMarker.lng, draggableMarker.lat]
  );

  const distanceInKm = useMemo(
    () => (origin.distanceTo(destination) / 1000).toFixed(2),
    [origin, destination]
  );

  const validDistance = useMemo(
    () => Number(distanceInKm) <= maxDistanceKm,
    [distanceInKm, maxDistanceKm]
  );

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const value = {
    action: action as ReturnType<typeof useHookFormAction>["action"],
    form,
    handleSubmitWithAction,
    handleCancel,
    onCancel,
    draggableMarker,
    setDraggableMarker,
    validDistance,
    distanceInKm,
    origin,
    maxDistanceKm,
  };

  return (
    <AddAddressFormContext.Provider value={value}>
      {children}
    </AddAddressFormContext.Provider>
  );
};

export const useAddAddressFormContext = () => {
  const context = use(AddAddressFormContext);

  if (!context) {
    throw new Error(
      "useAddressFormContext must be used within an AddressFormProvider"
    );
  }

  return context;
};
