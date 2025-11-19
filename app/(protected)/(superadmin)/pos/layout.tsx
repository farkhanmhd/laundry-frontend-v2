"use client";

import type { ReactNode } from "react";
import { PosOrder } from "@/components/features/pos/pos-order";
import { Input } from "@/components/ui/input";
import { useBreakpoint } from "@/hooks/use-breakpoints";

const PosLayout = ({ children }: { children: ReactNode }) => {
  const isLarge = useBreakpoint(1024);

  return (
    <div className="flex">
      <section className="w-full space-y-3 p-3">
        <Input
          className="border bg-background px-6 md:h-12 md:text-base"
          placeholder="Search Items or Services"
        />
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
          {children}
        </ul>
      </section>
      {isLarge && <PosOrder />}
    </div>
  );
};

export default PosLayout;
