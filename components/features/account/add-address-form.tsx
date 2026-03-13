"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";
import { useAddAddressFormContext } from "./add-address-form-context";
import { AddressFormInputs } from "./address-form-inputs";
import { SelectAddAdressMap } from "./select-address-map";

export function AddAddressForm() {
  const t = useTranslations("AccountSettings.addresses");
  const {
    action,
    form,
    handleSubmitWithAction,
    handleCancel,
    onCancel,
    validDistance,
  } = useAddAddressFormContext();

  return (
    <Card
      className="fade-in zoom-in-95 animate-in duration-200"
      style={cardShadowStyle}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <CardTitle className="font-semibold text-lg">
            {t("newAddress")}
          </CardTitle>
          <CardDescription>{t("newAddressDescription")}</CardDescription>
        </div>
        <Button onClick={onCancel} size="icon" variant="ghost">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <AddressFormInputs
          action={action}
          form={form}
          handleCancel={handleCancel}
          handleSubmitWithAction={handleSubmitWithAction}
          validDistance={validDistance}
        >
          <SelectAddAdressMap />
        </AddressFormInputs>
      </CardContent>
    </Card>
  );
}
