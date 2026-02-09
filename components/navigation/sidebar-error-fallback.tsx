"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  const { open } = useSidebar();
  let errorMessage = "An unknown Error occured";

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
            Something went wrong {errorMessage}
          </p>
          {/* <pre style={{ color: "red" }}>{error.message}</pre> */}
          <Button onClick={resetErrorBoundary} variant="secondary">
            Try Again
          </Button>
        </>
      )}
    </div>
  );
}
