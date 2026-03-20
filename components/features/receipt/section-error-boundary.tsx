// components/features/receipt/section-error-boundary.tsx
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SectionErrorFallback } from "./section-error-fallback";

interface SectionErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export function SectionErrorBoundary({
  children,
  fallback,
}: SectionErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={SectionErrorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
