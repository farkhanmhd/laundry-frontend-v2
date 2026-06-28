"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { createVehicleAction } from "@/lib/modules/vehicles/actions";
import { vehicleSchema } from "@/lib/modules/vehicles/schema";
import { toastResponse } from "@/lib/toast-helper";
import { VehicleDataForm } from "./vehicle-data-form";

export const CreateVehicleForm = () => {
  const t = useTranslations("Vehicles");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();
  const formData = useHookFormAction(
    createVehicleAction,
    zodResolver(vehicleSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          licensePlate: "",
        },
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result.data?.status === "success") {
            toast.success(toastResponse(tNotifications, result.data));
            push("/vehicles");
          } else {
            toast.error(toastResponse(tNotifications, result.data ?? {}));
          }
        },
      },
    }
  );

  return (
    <VehicleDataForm
      formData={formData}
      onSubmitVehicleAction={formData.handleSubmitWithAction}
      submitLabel={t("form.createNew")}
    />
  );
};
