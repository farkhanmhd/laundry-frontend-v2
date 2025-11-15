"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";

const PosLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-6 p-6">
    <section className="w-full space-y-4 lg:space-y-6">
      <Input
        className="border-border bg-background px-6 md:h-12 md:text-base"
        placeholder="Search Items or Services"
      />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {children}
      </ul>
    </section>
  </div>
);

export default PosLayout;
