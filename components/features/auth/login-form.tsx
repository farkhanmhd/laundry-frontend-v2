"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/utils/google-icon";
import { authClient } from "@/lib/modules/auth/auth-client";

export function LoginForm() {
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
    <Button
      className="flex h-11 w-full items-center justify-center gap-2 bg-white text-black hover:bg-accent dark:hover:bg-white"
      disabled={isPending}
      onClick={handleLogin}
    >
      <GoogleIcon />
      <span>Sign in with Google</span>
    </Button>
  );
}
