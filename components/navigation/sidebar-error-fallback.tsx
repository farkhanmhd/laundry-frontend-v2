"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  const t = useTranslations("Navigation.sidebarError");
  const { open } = useSidebar();
  let errorMessage = t("unknownError");

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div
      className="flex size-full flex-col items-center justify-center gap-3"
      role="alert"
    >
      {open && (
        <>
          <p className="text-center text-muted-foreground text-sm">
            {t("somethingWentWrong")} {errorMessage}
          </p>
          <Button onClick={resetErrorBoundary} variant="secondary">
            {t("tryAgain")}
          </Button>
        </>
      )}
    </div>
  );
}
