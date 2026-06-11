"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { toastResponse } from "@/lib/toast-helper";
import { updateAssetAction } from "@/lib/modules/assets/actions";
import { assetSchema } from "@/lib/modules/assets/schema";
import type { Asset } from "@/lib/modules/assets/data";
import { AssetDataForm } from "./asset-data-form";

type Props = {
  asset: Asset;
};

export const UpdateAssetForm = ({ asset }: Props) => {
  const t = useTranslations("Assets");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();
  const formData = useHookFormAction(
    updateAssetAction,
    zodResolver(assetSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          id: asset.id,
          name: asset.name,
          licensePlate: asset.licensePlate,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            push("/assets");
          }
        },
      },
    }
  );

  return (
    <AssetDataForm
      formData={formData}
      onSubmitAssetAction={formData.handleSubmitWithAction}
      submitLabel={t("form.updateAsset")}
    />
  );
};
