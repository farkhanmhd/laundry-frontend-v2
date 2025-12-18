import { DeliveriesItem } from "@/components/features/deliveries/deliveries-item";
import { Button } from "@/components/ui/button";
import { mockDeliveries } from "./data";

const MyOrdersPage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <div className="mb-8 flex flex-col gap-1.5">
      <h1 className="font-bold text-2xl tracking-tight">My Deliveries</h1>
      <p className="text-muted-foreground text-sm">
        Track your active pickups and deliveries and browse your delivery
        history.
      </p>
    </div>
    <div className="grid gap-4">
      {mockDeliveries.map((delivery) => (
        <DeliveriesItem delivery={delivery} key={delivery.id} shadow />
      ))}
      <Button variant="secondary">Load More</Button>
    </div>
  </div>
);

export default MyOrdersPage;
