import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { LngLat } from "maplibre-gl";
import { useRouter } from "next/navigation";
import { createContext, use, useMemo, useState } from "react";
import { toast } from "sonner";
import { LAUNDRY_POINT_ZERO } from "@/lib/constants";
import { updateAddressAction } from "@/lib/modules/account/actions";
import {
  type UpdateAddressSchemaWithId,
  updateAddressSchemaWithId,
} from "@/lib/modules/account/schema";

interface UpdateAddressContextState {
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
  address: UpdateAddressSchemaWithId;
}

const UpdateAddressFormContext =
  createContext<UpdateAddressContextState | null>(null);

type UpdateAddressFormProviderProps = {
  address: UpdateAddressSchemaWithId;
  children: React.ReactNode;
  onCancel: () => void;
};

export const UpdateAddressFormProvider = ({
  address,
  children,
  onCancel,
}: UpdateAddressFormProviderProps) => {
  const { refresh } = useRouter();
  const { action, form, handleSubmitWithAction } = useHookFormAction(
    updateAddressAction,
    zodResolver(updateAddressSchemaWithId),
    {
      formProps: {
        mode: "onChange",
        defaultValues: address,
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result?.data?.status === "success") {
            toast.success(result.data.message);
            onCancel();
            refresh();
          } else if (result?.serverError) {
            toast.error("Something went wrong");
          }
        },
      },
    }
  );

  const [draggableMarker, setDraggableMarker] = useState({
    lng: LAUNDRY_POINT_ZERO[0],
    lat: LAUNDRY_POINT_ZERO[1],
  });

  const origin = useMemo(
    () => new LngLat(LAUNDRY_POINT_ZERO[0], LAUNDRY_POINT_ZERO[1]),
    []
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
    () => Number(distanceInKm) <= 2,
    [distanceInKm]
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
    address,
  };

  return (
    <UpdateAddressFormContext.Provider value={value}>
      {children}
    </UpdateAddressFormContext.Provider>
  );
};

export const useUpdateAddressFormContext = () => {
  const context = use(UpdateAddressFormContext);

  if (!context) {
    throw new Error(
      "useAddressFormContext must be used within an AddressFormProvider"
    );
  }

  return context;
};
