"use client";

import type { ReactNode } from "react";
import { PosOrder } from "@/components/features/pos/pos-order";
import { useBreakpoint } from "@/hooks/use-breakpoints";

const PosLayout = ({ children }: { children: ReactNode }) => {
  const isLarge = useBreakpoint(1024);

  return (
    <div className="flex min-h-[calc(100dvh-128px)] md:min-h-[calc(100dvh-64px)]">
      <section className="w-full space-y-4 p-4">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {children}
        </ul>
      </section>
      {isLarge && <PosOrder />}
    </div>
  );
};

export default PosLayout;
