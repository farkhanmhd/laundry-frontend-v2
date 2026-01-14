import type { ReactNode } from "react";

interface Props {
  info: ReactNode;
  items: ReactNode;
  payment: ReactNode;
  customer: ReactNode;
  deliveries: ReactNode;
}

const OrderDetailLayout = ({
  info,
  items,
  payment,
  customer,
  deliveries,
}: Props) => {
  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {info}
          {items}
          {payment}
        </div>
        <div className="space-y-6">
          {customer}
          {deliveries}
        </div>
      </div>
    </section>
  );
};

export default OrderDetailLayout;
