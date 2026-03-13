import type { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useTranslations } from "next-intl";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AddressFormInputsProps {
  action: ReturnType<typeof useHookFormAction>["action"];
  form: ReturnType<typeof useHookFormAction>["form"];
  handleSubmitWithAction: ReturnType<
    typeof useHookFormAction
  >["handleSubmitWithAction"];
  handleCancel: () => void;
  validDistance: boolean;
  children: React.ReactNode;
}

export const AddressFormInputs = ({
  form,
  handleSubmitWithAction,
  action,
  handleCancel,
  validDistance,
  children,
}: AddressFormInputsProps) => {
  const t = useTranslations("AccountSettings.addresses");
  return (
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
        <div className="overflow-hidden rounded-md border">{children}</div>
        {(form.formState.errors.lat || form.formState.errors.lng) && (
          <p className="font-medium text-[0.8rem] text-destructive">
            {t("pinLocationError")}
          </p>
        )}
      </div>

      <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
        <Button disabled={action.isExecuting || !validDistance} type="submit">
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
  );
};
