"use client";

import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export function SidebarErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const { open } = useSidebar();

  return (
    <div
      className="flex size-full flex-col items-center justify-center gap-3"
      role="alert"
    >
      {open && (
        <>
          <p className="text-center text-muted-foreground text-sm">
            Something went wrong: {error.message}
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
