import { Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Client } from "@/components/utils/client";
import { CustomerDashboardApi } from "@/lib/modules/customer-dashboard/data";
import { cardShadowStyle, formatDate } from "@/lib/utils";

export default async function MyRewardsSlot() {
  const vouchers = await CustomerDashboardApi.getVouchers();

  return (
    <Card className="gap-0" style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-base">
            Available Rewards
          </CardTitle>
        </div>
        <CardDescription>Redeem your points for deals</CardDescription>
      </CardHeader>
      <CardContent>
        {vouchers.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Ticket className="size-8 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>No Rewards Available</EmptyTitle>
              <EmptyDescription>
                You don't have any rewards to redeem yet. Place an order to earn
                points!
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <div
                className="relative flex flex-col gap-2 rounded-lg border border-dashed p-3"
                key={voucher.id}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-sm">
                        {voucher.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-dashed pt-2">
                  <div className="flex items-center justify-between rounded bg-muted px-2 py-1">
                    <span className="font-bold font-mono text-[10px] tracking-wide">
                      {voucher.code}
                    </span>
                  </div>
                  <Client>
                    <p className="text-muted-foreground text-xs">
                      Expires{" "}
                      {voucher.expiresAt
                        ? formatDate(voucher.expiresAt)
                        : "No expiration"}
                    </p>
                  </Client>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
