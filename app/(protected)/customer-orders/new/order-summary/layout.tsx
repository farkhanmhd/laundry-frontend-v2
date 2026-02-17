import type React from "react";

interface Props {
  address: React.ReactNode;
  items: React.ReactNode;
  points: React.ReactNode;
  paymentSummary: React.ReactNode;
  children: React.ReactNode;
}

const CustomerOrderSummaryLayout = ({
  address,
  items,
  points,
  paymentSummary,
  children,
}: Props) => {
  return (
    <div className="mx-auto min-h-[calc(100dvh-144px)] max-w-7xl p-4 md:min-h-[calc(100dvh-64px)]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-8">
          {address}
          {items}
        </div>
        <div className="space-y-3 lg:sticky lg:top-4 lg:col-span-4">
          {points}
          {paymentSummary}
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderSummaryLayout;
