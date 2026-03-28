import Link from "next/link";
import { OrderListItem } from "@/components/features/orders/order-list-item";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CustomerOrder } from "@/hooks/use-customer-orders";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle, cn } from "@/lib/utils";

export default async function RecentOrdersSlot() {
  const orders = await CustomerDashboardApi.getOrders();

  const mappedOrders: CustomerOrder[] = orders.map((order) => ({
    id: order.id,
    status: order.status as CustomerOrder["status"],
    total: order.total,
    createdAt: order.createdAt,
  }));

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-lg">Recent Orders</CardTitle>
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href="/customer-orders"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {mappedOrders.map((order) => (
          <OrderListItem key={order.id} order={order} />
        ))}
      </CardContent>
    </Card>
  );
}
