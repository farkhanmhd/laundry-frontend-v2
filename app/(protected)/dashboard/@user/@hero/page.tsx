import { Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle } from "@/lib/utils";

export default async function HeroSlot() {
  const customerInfo = await CustomerDashboardApi.getCustomerInfo();

  return (
    <Card
      className="border-none bg-primary text-primary-foreground dark:bg-primary"
      style={cardShadowStyle}
    >
      <CardContent>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle className="font-bold text-2xl">
              Hello, {customerInfo.name}
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              {customerInfo.phone}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
            <div className="rounded-full bg-yellow-400 p-2 text-yellow-900">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-xs opacity-80">Current Points</p>
              <p className="font-bold text-xl">
                {customerInfo.points.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
