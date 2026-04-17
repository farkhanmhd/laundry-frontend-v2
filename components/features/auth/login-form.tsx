"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/utils/google-icon";
import { authClient } from "@/lib/modules/auth/auth-client";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("LoginPage");
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
      });
    });
  };

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold text-2xl text-foreground tracking-tight">
          {t("greeting")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="flex h-11 w-full items-center justify-center gap-2 bg-background"
          disabled={isPending}
          onClick={handleLogin}
          variant="outline"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
}
