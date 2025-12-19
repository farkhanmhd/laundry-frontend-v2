import { OrderListItem } from "@/components/features/orders/order-list-item";
import { Button } from "@/components/ui/button";
import { mockCustomerOrders } from "./data";

const MyOrdersPage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <div className="mb-8 flex flex-col gap-1.5">
      <h1 className="font-bold text-2xl tracking-tight">My Orders</h1>
      <p className="text-muted-foreground text-sm">
        View the status of your ongoing laundry and browse your past history.
      </p>
    </div>
    <div className="grid gap-4">
      {mockCustomerOrders.map((order) => (
        <OrderListItem key={order.id} order={order} shadow />
      ))}
      <Button variant="secondary">Load More</Button>
    </div>
  </div>
);

export default MyOrdersPage;
