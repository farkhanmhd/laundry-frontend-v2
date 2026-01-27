"use client";

import type React from "react";
import { PosSummarySubmitButton } from "@/components/features/pos/pos-summary-submit-button";

interface Props {
  customer: React.ReactNode;
  items: React.ReactNode;
  voucher: React.ReactNode;
  payment: React.ReactNode;
}

const Layout = ({ customer, items, voucher, payment }: Props) => {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-8">
          {customer}
          {items}
          {voucher}
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 lg:col-span-4">
          {payment}
          <div className="mt-4">
            <PosSummarySubmitButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
