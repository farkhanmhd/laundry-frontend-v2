type Props = {
  header: React.ReactNode;
  orderItems: React.ReactNode;
  payment: React.ReactNode;
  deliveries: React.ReactNode;
};

export default function OrderDetailLayout({
  header,
  orderItems,
  payment,
  deliveries,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 p-4 md:p-6">
      {header}
      <div className="grid grid-cols-1 gap-6">
        {orderItems}
        <div className="space-y-6">
          {payment}
          {deliveries}
        </div>
      </div>
    </div>
  );
}
