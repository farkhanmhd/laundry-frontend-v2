"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateVehicleAction } from "@/lib/modules/vehicles/actions";
import type { Vehicle } from "@/lib/modules/vehicles/data";
import { vehicleSchema } from "@/lib/modules/vehicles/schema";
import { toastResponse } from "@/lib/toast-helper";
import { VehicleDataForm } from "./vehicle-data-form";

type Props = {
  vehicle: Vehicle;
};

export const UpdateVehicleForm = ({ vehicle }: Props) => {
  const t = useTranslations("Vehicles");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();
  const formData = useHookFormAction(
    updateVehicleAction,
    zodResolver(vehicleSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          id: vehicle.id,
          name: vehicle.name,
          licensePlate: vehicle.licensePlate,
          ownerId: vehicle.ownerId ?? undefined,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            push("/vehicles");
          }
        },
      },
    }
  );

  return (
    <VehicleDataForm
      formData={formData}
      initialDriverName={vehicle.ownerName}
      onSubmitVehicleAction={formData.handleSubmitWithAction}
      submitLabel={t("form.updateVehicle")}
    />
  );
};
