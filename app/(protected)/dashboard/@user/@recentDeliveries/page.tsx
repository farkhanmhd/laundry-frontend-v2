import Link from "next/link";
import { DeliveriesItem } from "@/components/features/deliveries/deliveries-item";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle, cn } from "@/lib/utils";

export default async function RecentDeliveriesSlot() {
  const deliveries = await CustomerDashboardApi.getDeliveries();

  return (
    <Card className="gap-3" style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-semibold md:text-lg">
            Recent Deliveries
          </CardTitle>
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href="/customer-deliveries"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {deliveries.map((delivery) => (
          <DeliveriesItem delivery={delivery} key={delivery.id} />
        ))}
      </CardContent>
    </Card>
  );
}
