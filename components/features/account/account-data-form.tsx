"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
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
import {
  type UpdateProfileSchema,
  updateProfileSchema,
} from "@/lib/modules/account/schema";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  account: UpdateProfileSchema;
};

export function AccountDataForm({ account }: Props) {
  const { refresh } = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updateProfileAction,
    zodResolver(updateProfileSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          username: account.username,
          name: account.name,
          phone: account.phone,
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
          <CardTitle className="font-semibold text-lg">
            Account Settings
          </CardTitle>
          {!isEditing && (
            <Button
              className="gap-2"
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
            >
              Edit Profile
            </Button>
          )}
        </div>

        {/* Edit Button Toggle */}
        <CardDescription>
          Manage your personal information and contact details.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
          {/* Username Field */}
          <FormInput
            description="This is your unique display handle."
            disabled={!isEditing || action.isPending}
            form={form}
            label="Username"
            name="username"
            placeholder="Enter your username"
          />

          {/* Name Field */}
          <FormInput
            disabled={!isEditing || action.isPending}
            form={form}
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
          />

          {/* Phone Number Field */}
          <FormInput
            description="Used for delivery coordination and membership points."
            disabled={!isEditing || action.isPending}
            form={form}
            label="Phone Number"
            name="phone"
            placeholder="e.g. 08123456789"
            type="tel"
          />

          {/* Action Buttons - Only visible when editing */}
          {isEditing && (
            <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
              <Button disabled={action.isPending} type="submit">
                {action.isPending ? "Saving..." : "Save Changes"}
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
          )}
        </form>
      </CardContent>
    </Card>
  );
}
