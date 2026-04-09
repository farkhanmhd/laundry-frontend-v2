// components/features/receipt/order-ui.tsx

import { cn, MapItems } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Section card wrapper
// ---------------------------------------------------------------------------
export function SectionCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm ring-1 ring-white/5 ring-inset backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section heading
// ---------------------------------------------------------------------------
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-semibold text-[11px] text-muted-foreground/60 uppercase tracking-widest">
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Skeleton primitives
// ---------------------------------------------------------------------------
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted/50", className)} />
  );
}

export function InfoSkeleton() {
  return (
    <SectionCard>
      <Skeleton className="mb-4 h-3 w-16" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-32" />
      </div>
    </SectionCard>
  );
}

export function CustomerSkeleton() {
  return (
    <SectionCard>
      <Skeleton className="mb-4 h-3 w-16" />
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
    </SectionCard>
  );
}

export function DeliveriesSkeleton() {
  return (
    <SectionCard>
      <Skeleton className="mb-4 h-3 w-16" />
      <Skeleton className="h-4 w-full" />
    </SectionCard>
  );
}

export function PaymentSkeleton() {
  return (
    <SectionCard>
      <Skeleton className="mb-4 h-3 w-16" />
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </SectionCard>
  );
}

export function ItemsSkeleton() {
  return (
    <SectionCard>
      <Skeleton className="mb-4 h-3 w-16" />
      <div className="flex flex-col gap-3">
        <MapItems
          of={Array.from({ length: 3 })}
          render={(_, i) => (
            <div className="flex items-center justify-between" key={i}>
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-16" />
            </div>
          )}
        />
      </div>
    </SectionCard>
  );
}
