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
import { updateAdminAction } from "@/lib/modules/account/actions";
import {
  type UpdateAdminSchema,
  updateAdminSchema,
} from "@/lib/modules/account/schema";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  account: UpdateAdminSchema;
};

export function AdminDataForm({ account }: Props) {
  const t = useTranslations("AccountSettings.accountSettings");
  const { refresh } = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updateAdminAction,
    zodResolver(updateAdminSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          username: account.username,
          name: account.name,
          phone: account.phone,
          email: account.email,
        },
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result?.data?.status === "success") {
            toast.success(result.data.message);
            setIsEditing(false); // Exit edit mode on success
            refresh();
          } else if (result?.serverError) {
            toast.error("Something went wrong");
          }
        },
      },
    }
  );

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
        <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
          {/* Username Field */}
          <FormInput
            description={t("usernameDescription")}
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("username")}
            name="username"
            placeholder={t("usernamePlaceholder")}
          />

          {/* Name Field */}
          <FormInput
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("fullName")}
            name="name"
            placeholder={t("fullNamePlaceholder")}
          />

          {/* Phone Number Field */}
          <FormInput
            description={t("phoneDescription")}
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("phoneNumber")}
            name="phone"
            placeholder={t("phoneNumberPlaceholder")}
            type="tel"
          />
          <FormInput
            description={t("emailDescription")}
            disabled={!isEditing || action.isPending}
            form={form}
            label={t("email")}
            name="email"
            placeholder={t("emailPlaceholder")}
            type="email"
          />

          {/* Action Buttons - Only visible when editing */}
          {isEditing && (
            <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
              <Button disabled={action.isPending} type="submit">
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
