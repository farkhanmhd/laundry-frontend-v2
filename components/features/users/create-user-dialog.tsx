"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UsersApi } from "@/lib/modules/users/data";
import {
  type CreateCashierSchema,
  createCashierSchema,
} from "@/lib/modules/users/schema";

export function CreateUserDialog() {
  const t = useTranslations("Users.createUserDialog");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateCashierSchema>({
    resolver: zodResolver(createCashierSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: CreateCashierSchema) => {
    try {
      const response = await UsersApi.createCashier(data);

      if (response.error) {
        toast.error(response.error.value?.message || t("errorMessage"));
        return;
      }

      toast.success(t("successMessage"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      form.reset();
    } catch {
      toast.error(t("errorMessage"));
    }
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="rounded-none">
          <Plus />
          {t("createUser")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            disabled={form.formState.isSubmitting}
            form={form}
            label={t("name")}
            name="name"
            placeholder={t("namePlaceholder")}
          />
          <FormInput
            disabled={form.formState.isSubmitting}
            form={form}
            label={t("username")}
            name="username"
            placeholder={t("usernamePlaceholder")}
          />
          <FormInput
            disabled={form.formState.isSubmitting}
            form={form}
            label={t("email")}
            name="email"
            placeholder={t("emailPlaceholder")}
            type="email"
          />
          <FormInput
            disabled={form.formState.isSubmitting}
            form={form}
            label={t("phoneNumber")}
            name="phoneNumber"
            placeholder={t("phoneNumberPlaceholder")}
            type="tel"
          />
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel disabled={form.formState.isSubmitting}>
              {t("cancel")}
            </AlertDialogCancel>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderIcon className="animate-spin" />
                  {t("creating")}
                </span>
              ) : (
                t("submit")
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
