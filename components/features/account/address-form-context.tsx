import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { LngLat } from "maplibre-gl";
import { useRouter } from "next/navigation";
import { createContext, use, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { LAUNDRY_POINT_ZERO } from "@/lib/constants";
import { addAddressAction } from "@/lib/modules/account/actions";
import type { AccountAddress } from "@/lib/modules/account/data";
import { addressSchema } from "@/lib/modules/account/schema";

interface AddressFormContextState {
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
  address?: AccountAddress;
}

const AddressFormContext = createContext<AddressFormContextState | null>(null);

// type AddressSchema = {
//     id: string;
//     label: string;
//     street: string;
//     lat: number;
//     lng: number;
//     note?: string | undefined;
// }

type AddressFormProviderProps = {
  children: React.ReactNode;
  address?: AccountAddress;
  onCancel: () => void;
};

const addressDefaultValues: AccountAddress = {
  id: Math.random().toString(),
  label: "",
  street: "",
  lat: 0,
  lng: 0,
  note: "",
};

export const AddressFormProvider = ({
  children,
  address,
  onCancel,
}: AddressFormProviderProps) => {
  const { refresh } = useRouter();
  const { action, form, handleSubmitWithAction } = useHookFormAction(
    addAddressAction,
    zodResolver(addressSchema),
    {
      formProps: {
        mode: "onChange",
        values: address ?? addressDefaultValues,
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

  useEffect(() => {
    if (address) {
      setDraggableMarker({
        lng: address.lng,
        lat: address.lat,
      });
    }
  }, [address]);

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

  useEffect(() => {
    if (address) {
      form.reset(address);
    } else {
      form.reset();
    }
  }, [address, form]);

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
    <AddressFormContext.Provider value={value}>
      {children}
    </AddressFormContext.Provider>
  );
};

export const useAddressFormContext = () => {
  const context = use(AddressFormContext);

  if (!context) {
    throw new Error(
      "useAddressFormContext must be used within an AddressFormProvider"
    );
  }

  return context;
};
