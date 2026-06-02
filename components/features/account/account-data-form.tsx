"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateProfileAction } from "@/lib/modules/account/actions";
import type { AccountInfo } from "@/lib/modules/account/data";
import { updateProfileSchema } from "@/lib/modules/account/schema";
import { cardShadowStyle } from "@/lib/utils";

interface Props {
  data: AccountInfo;
}

export function AccountDataForm({ data }: Props) {
  const t = useTranslations("AccountSettings.accountSettings");
  const tValidation = useTranslations("Validation");
  const { refresh } = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { form, action } = useHookFormAction(
    updateProfileAction,
    zodResolver(updateProfileSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          username: data?.username as string,
          name: data?.name,
          phone: data?.phone || "",
        },
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result?.data?.status === "success") {
            toast.success(t("toastSuccess"));

            setIsEditing(false);
            refresh();
          } else if (result?.data?.message === "Username already taken") {
            toast.error(t("toastUsernameTaken"));
          } else {
            toast.error(t("toastError"));
          }
        },
      },
    }
  );

  const watchValues = form.watch();
  const isInvalid = !(
    watchValues.username?.trim() &&
    watchValues.name?.trim() &&
    String(watchValues.phone)
  );

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const submittedData = {
      name: form.watch("name"),
      username: form.watch("username"),
      phone: form.watch("phone"),
    };

    action.execute(submittedData);
  };

  const handleCancel = () => {
    form.reset(); // Revert changes
    setIsEditing(false);
  };

  return (
    <Card id="settings" style={cardShadowStyle}>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-lg">{t("title")}</CardTitle>
          {!isEditing && (
            <Button
              className="gap-2"
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
            >
              {t("editProfile")}
            </Button>
          )}
        </div>

        {/* Edit Button Toggle */}
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Email (read-only) */}
          <div className="space-y-2">
            <p className="mb-0 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("email")}
            </p>
            <p className="text-muted-foreground text-sm">{data?.email}</p>
          </div>
          {/* Username Field */}
          <FormInput
            description={t("usernameDescription")}
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("username")}
            name="username"
            placeholder={t("usernamePlaceholder")}
            tValidation={tValidation}
          />

          {/* Name Field */}
          <FormInput
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("fullName")}
            name="name"
            placeholder={t("fullNamePlaceholder")}
            tValidation={tValidation}
          />

          {/* Phone Number Field */}
          <div className="relative">
            <span className="absolute top-11 left-2 text-muted-foreground text-sm">
              +62
            </span>
            <FormInput
              className="pl-9"
              description={t("phoneDescription")}
              disabled={!isEditing || action.isPending}
              form={form}
              label={t("phoneNumber")}
              name="phone"
              placeholder={t("phoneNumberPlaceholder")}
              tValidation={tValidation}
              type="tel"
            />
          </div>

          {/* Action Buttons - Only visible when editing */}
          {isEditing && (
            <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
              <Button disabled={action.isPending || isInvalid} type="submit">
                {action.isPending ? t("saving") : t("saveChanges")}
              </Button>

              <Button
                className="gap-2 text-muted-foreground hover:text-foreground"
                disabled={action.isPending}
                onClick={handleCancel}
                type="button"
                variant="ghost"
              >
                {t("cancel")}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
