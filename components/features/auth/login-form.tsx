"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Triangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type LoginSchema,
  loginSchema,
} from "@/components/features/auth/schema";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { authClient } from "@/lib/modules/auth/auth-client";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { push } = useRouter();
  const t = useTranslations("LoginPage");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const { data: session, error } = await authClient.signIn.username(data);

      if (error) {
        toast.error(error.statusText, {
          description: error.message,
        });
      } else {
        toast.success(t("welcomeBack", { name: session.user.name }));
        push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t("errorMessage"));
      }
    }
  };

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <form
        className="flex w-full flex-col items-center justify-center gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <div className="flex flex-col items-center gap-2 font-medium">
            <div className="flex flex-col items-center justify-center gap-3 rounded-md">
              <Triangle className="size-6" />
              <h1 className="font-bold text-xl">{t("greeting")}</h1>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm space-y-5">
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
            label={t("password")}
            name="password"
            placeholder={t("passwordPlaceholder")}
            type="password"
          />
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t("signIn")}
          </Button>

          <FieldDescription className="px-6 text-center">
            {t("termsDescription")}
            <Link href="#">{t("termsOfService")}</Link>
            <span>{t("and")}</span>
            <Link href="#">{t("privacyPolicy")}</Link>.
          </FieldDescription>
        </div>
      </form>
    </div>
  );
}
