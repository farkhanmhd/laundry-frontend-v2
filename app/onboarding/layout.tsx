import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import type React from "react";
import { SignoutDialog } from "@/components/features/auth/signout-dialog";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";
import { Button } from "@/components/ui/button";
import { getCurrentUserData } from "@/lib/modules/auth/session";

const OnboardingLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUser = await getCurrentUserData();

  if (currentUser?.role !== "user" || currentUser?.phoneNumber) {
    redirect("/dashboard");
  }

  return (
    <section className="flex h-svh items-center justify-center">
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <TranslatorToggle />
        <ThemeToggle />
        <SignoutDialog>
          <Button variant="ghost">
            <LogOut />
          </Button>
        </SignoutDialog>
      </div>
      {children}
    </section>
  );
};

export default OnboardingLayout;
