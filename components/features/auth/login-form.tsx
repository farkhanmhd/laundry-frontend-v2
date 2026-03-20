// login-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
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
    <div className={cn("flex w-full flex-col gap-7", className)} {...props}>
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-semibold text-[22px] text-foreground tracking-[-0.02em]">
          {t("greeting")}
        </h1>
        <p className="text-[13.5px] text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60" />

      {/* Form */}
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormInput
            disabled={form.formState.isSubmitting}
            form={form}
            label={t("username")}
            name="username"
            placeholder={t("usernamePlaceholder")}
          />
          <div className="flex flex-col gap-1.5">
            <FormInput
              disabled={form.formState.isSubmitting}
              form={form}
              label={t("password")}
              name="password"
              placeholder={t("passwordPlaceholder")}
              type="password"
            />
            {/* Forgot password — placed right under the password field */}
            <div className="flex justify-end">
              <Link
                className="text-[12px] text-muted-foreground/70 transition-colors hover:text-primary"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <Button
          className="mt-1 w-full rounded-lg font-medium tracking-[-0.01em] transition-all active:scale-[0.98]"
          disabled={form.formState.isSubmitting}
          size="default"
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <LoaderIcon className="animate-spin" />
              Signing in…
            </span>
          ) : (
            t("signIn")
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-[12.5px] text-muted-foreground/70">
        {t("noAccount")}{" "}
        <Link
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          href="/register"
        >
          {t("register")}
        </Link>
      </p>
    </div>
  );
}
