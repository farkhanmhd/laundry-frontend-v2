import { UserQuickActions } from "@/components/features/dashboard/user-quick-actions";
import { UserHero } from "./user-hero";
import { UserRecentDeliveries } from "./user-recent-deliveries";
import { UserRecentOrders } from "./user-recent-orders";
import { UserRewards } from "./user-rewards";

export function UserDashboard() {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <UserHero />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <UserRecentDeliveries />
            <UserRecentOrders />
          </div>
          <div className="row-start-1 space-y-6 lg:row-auto">
            <UserQuickActions />
            <UserRewards />
          </div>
        </div>
      </div>
    </div>
  );
}
