"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { elysia } from "@/elysia";
import {
  addWeightRangeAction,
  updateWeightRangeAction,
} from "@/lib/modules/weight-ranges/actions";
import {
  addWeightRangeSchema,
  updateWeightRangeSchema,
} from "@/lib/modules/weight-ranges/schema";
import { toastResponse } from "@/lib/toast-helper";

export const AddWeightRangeForm = () => {
  const t = useTranslations("WeightRanges");
  const tValidation = useTranslations("Validation");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();

  const { data: existingRanges } = useQuery({
    queryKey: ["weight-ranges"],
    queryFn: async () => {
      const { data: response } = await elysia["weight-ranges"].get({
        fetch: {
          credentials: "include",
        },
      });
      return response?.data;
    },
  });

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    addWeightRangeAction,
    zodResolver(addWeightRangeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          minWeight: 0,
          maxWeight: 0,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            push("/weight-ranges");
          }
        },
      },
    }
  );

  const minWeight = form.watch("minWeight");
  const maxWeight = form.watch("maxWeight");

  const hasOverlap = useMemo(() => {
    if (!existingRanges || minWeight === undefined || maxWeight === undefined) {
      return false;
    }
    return existingRanges.some((r) => {
      const existingMin = Number(r.minWeight);
      const existingMax = Number(r.maxWeight);
      return (
        Number(minWeight) <= existingMax && Number(maxWeight) >= existingMin
      );
    });
  }, [existingRanges, minWeight, maxWeight]);

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.createNew")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.createDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.label")}
          name="label"
          placeholder={t("form.labelPlaceholder")}
          tValidation={tValidation}
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            disabled={action.isPending}
            form={form}
            label={`${t("form.minWeight")} Kg`}
            name="minWeight"
            placeholder="0"
            tValidation={tValidation}
            type="number"
          />
          <FormInput
            disabled={action.isPending}
            form={form}
            label={`${t("form.maxWeight")} Kg`}
            name="maxWeight"
            placeholder="10"
            tValidation={tValidation}
            type="number"
          />
        </div>
        {hasOverlap && (
          <p className="text-destructive text-sm">{t("form.overlapError")}</p>
        )}
        <div className="flex justify-end gap-3">
          <Button
            disabled={action.isPending}
            onClick={() => push("/weight-ranges")}
            type="button"
            variant="ghost"
          >
            {t("form.cancel")}
          </Button>
          <Button disabled={action.isPending || hasOverlap} type="submit">
            {t("form.addNew")}
          </Button>
        </div>
      </form>
    </div>
  );
};

type EditProps = {
  id: number;
  label: string;
  minWeight: number;
  maxWeight: number;
  isActive: boolean | null;
};

export const EditWeightRangeForm = ({
  id,
  label,
  minWeight,
  maxWeight,
  isActive,
}: EditProps) => {
  const t = useTranslations("WeightRanges");
  const tValidation = useTranslations("Validation");
  const tNotifications = useTranslations("Notifications");
  const { push } = useRouter();

  const { data: existingRanges } = useQuery({
    queryKey: ["weight-ranges"],
    queryFn: async () => {
      const { data: response } = await elysia["weight-ranges"].get({
        fetch: {
          credentials: "include",
        },
      });
      return response?.data;
    },
  });

  const { form, action } = useHookFormAction(
    updateWeightRangeAction,
    zodResolver(updateWeightRangeSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          id,
          label,
          minWeight,
          maxWeight,
          isActive: isActive ?? false,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(toastResponse(tNotifications, data));
            push("/weight-ranges");
          }
        },
      },
    }
  );

  const currentMinWeight = form.watch("minWeight");
  const currentMaxWeight = form.watch("maxWeight");

  const hasOverlap = useMemo(() => {
    if (
      !existingRanges ||
      currentMinWeight === undefined ||
      currentMaxWeight === undefined
    ) {
      return false;
    }
    return existingRanges.some((r) => {
      if (r.id === id) {
        return false;
      }
      const existingMin = Number(r.minWeight);
      const existingMax = Number(r.maxWeight);
      return (
        Number(currentMinWeight) <= existingMax &&
        Number(currentMaxWeight) >= existingMin
      );
    });
  }, [existingRanges, currentMinWeight, currentMaxWeight, id]);

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData = {
      id,
      label: form.getValues("label"),
      minWeight: Number(form.getValues("minWeight")),
      maxWeight: Number(form.getValues("maxWeight")),
      isActive: form.getValues("isActive") ?? false,
    };
    action.execute(formData);
  };

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.editTitle")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.editDescription")}
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormInput
          disabled={action.isPending}
          form={form}
          label={t("form.label")}
          name="label"
          placeholder={t("form.labelPlaceholder")}
          tValidation={tValidation}
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <FormInput
            disabled={action.isPending}
            form={form}
            label={t("form.minWeight")}
            name="minWeight"
            placeholder="0"
            tValidation={tValidation}
            type="number"
          />
          <FormInput
            disabled={action.isPending}
            form={form}
            label={t("form.maxWeight")}
            name="maxWeight"
            placeholder="10"
            tValidation={tValidation}
            type="number"
          />
        </div>
        {hasOverlap && (
          <p className="text-destructive text-sm">{t("form.overlapError")}</p>
        )}
        <FieldGroup>
          <Controller
            control={form.control}
            name="isActive"
            render={({ field, fieldState }) => (
              <FieldLabel>
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    checked={!!field.value}
                    disabled={action.isPending}
                    id={field.name}
                    name={field.name}
                    onCheckedChange={field.onChange}
                  />
                  <FieldContent>
                    <FieldTitle>{t("form.isActive")}</FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end gap-3">
          <Button
            disabled={action.isPending}
            onClick={() => push("/weight-ranges")}
            type="button"
            variant="ghost"
          >
            {t("form.cancel")}
          </Button>
          <Button disabled={action.isPending || hasOverlap} type="submit">
            {t("form.saveChanges")}
          </Button>
        </div>
      </form>
    </div>
  );
};
