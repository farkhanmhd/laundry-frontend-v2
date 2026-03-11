"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormInput } from "@/components/forms/form-input";
import { SelectAdressMap } from "@/components/maps/select-address-map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cardShadowStyle, cn } from "@/lib/utils";
import { useAddressFormContext } from "./address-form-context";

export function AddressForm() {
  const t = useTranslations("AccountSettings.addresses");
  const {
    action,
    form,
    handleSubmitWithAction,
    handleCancel,
    onCancel,
    validDistance,
  } = useAddressFormContext();

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
        <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
          <FormInput
            disabled={action.isExecuting}
            form={form}
            label={t("addressLabel")}
            name="label"
            placeholder={t("addressLabelPlaceholder")}
          />
          <FormInput
            disabled={action.isExecuting}
            form={form}
            label={t("fullAddress")}
            name="street"
            placeholder={t("fullAddressPlaceholder")}
          />
          <FormInput
            as={Textarea}
            disabled={action.isExecuting}
            form={form}
            label={t("addressNoteLabel")}
            name="note"
            placeholder={t("addressNotePlaceholder")}
          />

          <div className="space-y-3">
            <Label
              className={cn("text-base", {
                "text-destructive":
                  form.formState.errors.lat || form.formState.errors.lng,
              })}
            >
              {t("pinLocation")}
            </Label>
            <div className="overflow-hidden rounded-md border">
              <SelectAdressMap />
            </div>
            {(form.formState.errors.lat || form.formState.errors.lng) && (
              <p className="font-medium text-[0.8rem] text-destructive">
                {t("pinLocationError")}
              </p>
            )}
          </div>

          <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
            <Button
              disabled={action.isExecuting || !validDistance}
              type="submit"
            >
              {action.isExecuting ? t("saving") : t("saveAddress")}
            </Button>
            <Button
              className="gap-2 text-muted-foreground hover:text-foreground"
              disabled={action.isExecuting}
              onClick={handleCancel}
              type="button"
              variant="ghost"
            >
              {t("cancel")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
