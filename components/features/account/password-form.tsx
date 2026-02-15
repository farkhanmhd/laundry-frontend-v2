"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { LockKeyhole } from "lucide-react";
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
import { updatePasswordAction } from "@/lib/modules/account/actions";
import { updatePasswordSchema } from "@/lib/modules/account/schema";
import { cardShadowStyle } from "@/lib/utils";

export function PasswordForm() {
  const t = useTranslations("AccountSettings.security");
  const [isEditing, setIsEditing] = useState(false);

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updatePasswordAction,
    zodResolver(updatePasswordSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result?.data?.status === "success") {
            toast.success(result.data.message);
            setIsEditing(false);
            form.reset(); // Clear sensitive fields on success
          } else if (result?.serverError) {
            toast.error("Something went wrong");
          }
        },
      },
    }
  );

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <Card id="password" style={cardShadowStyle}>
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
              {t("changePassword")}
            </Button>
          )}
        </div>

        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmitWithAction}
          >
            {/* Old Password */}
            <FormInput
              disabled={action.isPending}
              form={form}
              label={t("currentPassword")}
              name="oldPassword"
              placeholder={t("currentPasswordPlaceholder")}
              type="password"
            />

            {/* New Password */}
            <FormInput
              disabled={action.isPending}
              form={form}
              label={t("newPassword")}
              name="newPassword"
              placeholder={t("newPasswordPlaceholder")}
              type="password"
            />

            {/* Confirm Password */}
            <FormInput
              disabled={action.isPending}
              form={form}
              label={t("confirmNewPassword")}
              name="confirmPassword"
              placeholder={t("confirmNewPasswordPlaceholder")}
              type="password"
            />

            {/* Action Buttons */}
            <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
              <Button disabled={action.isPending} type="submit">
                {action.isPending ? t("updating") : t("updatePassword")}
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
          </form>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <LockKeyhole className="h-4 w-4" />
            <span>••••••••••••••••</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
