"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addMemberAction } from "@/lib/modules/members/actions";
import {
  type AddMemberSchema,
  addMemberSchema,
} from "@/lib/modules/members/schema";

export function AddMemberDialog() {
  const [open, setOpen] = useState(false);
  const { refresh } = useRouter();
  const t = useTranslations("Members.addMember");
  const { form, action } = useHookFormAction(
    addMemberAction,
    zodResolver(addMemberSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          phone: "",
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success(data.message);
            setOpen(false);
            form.reset();
            refresh();
          }
        },
      },
    }
  );

  const onSubmit = (data: AddMemberSchema) => {
    action.execute(data);
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="rounded-[10px]" type="button">
          <Plus />
          <span>{t("button")}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
        </AlertDialogHeader>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            disabled={action.isPending}
            form={form}
            label={t("name")}
            name="name"
            placeholder={t("namePlaceholder")}
          />
          <FieldGroup>
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-base" htmlFor={field.name}>
                    {t("phone")}
                  </FieldLabel>
                  <div className="relative">
                    <span className="absolute top-2 left-3 text-muted-foreground text-sm">
                      +62
                    </span>
                    <Input
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="pl-10 text-sm"
                      disabled={action.isPending}
                      id={field.name}
                      {...form.register("phone")}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex justify-end gap-3">
            <Button
              disabled={action.isPending}
              onClick={handleCancel}
              type="button"
              variant="ghost"
            >
              {t("cancel")}
            </Button>
            <Button disabled={action.isPending} type="submit">
              {t("submit")}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
