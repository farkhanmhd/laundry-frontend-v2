"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type CreateUserSchema,
  createUserSchema,
} from "@/components/features/users/schema";
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

export function CreateUserDialog() {
  const t = useTranslations("Users.createUserDialog");
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: CreateUserSchema) => {
    try {
      console.log("Create user data:", data);
      toast.success(t("successMessage"));
      setOpen(false);
      form.reset();
      push("/users");
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
