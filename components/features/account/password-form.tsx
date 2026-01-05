"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { LockKeyhole } from "lucide-react"; // Optional icon
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
          <CardTitle className="font-semibold text-lg">Security</CardTitle>
          {!isEditing && (
            <Button
              className="gap-2"
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
            >
              Change Password
            </Button>
          )}
        </div>

        <CardDescription>
          Ensure your account is secure by using a strong password.
        </CardDescription>
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
              label="Current Password"
              name="oldPassword"
              placeholder="Enter current password"
              type="password"
            />

            {/* New Password */}
            <FormInput
              disabled={action.isPending}
              form={form}
              label="New Password"
              name="newPassword"
              placeholder="Enter new password"
              type="password"
            />

            {/* Confirm Password */}
            <FormInput
              disabled={action.isPending}
              form={form}
              label="Confirm New Password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              type="password"
            />

            {/* Action Buttons */}
            <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
              <Button disabled={action.isPending} type="submit">
                {action.isPending ? "Updating..." : "Update Password"}
              </Button>

              <Button
                className="gap-2 text-muted-foreground hover:text-foreground"
                disabled={action.isPending}
                onClick={handleCancel}
                type="button"
                variant="ghost"
              >
                Cancel
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
