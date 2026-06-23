"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { createAssetAction } from "@/lib/modules/assets/actions";
import { assetSchema } from "@/lib/modules/assets/schema";
import { toastResponse } from "@/lib/toast-helper";
import { AssetDataForm } from "./asset-data-form";

export const CreateAssetForm = () => {
  const t = useTranslations("Assets");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();
  const formData = useHookFormAction(
    createAssetAction,
    zodResolver(assetSchema),
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
            push("/assets");
          } else {
            toast.error(toastResponse(tNotifications, result.data ?? {}));
          }
        },
      },
    }
  );

  return (
    <AssetDataForm
      formData={formData}
      onSubmitAssetAction={formData.handleSubmitWithAction}
      submitLabel={t("form.createNew")}
    />
  );
};
