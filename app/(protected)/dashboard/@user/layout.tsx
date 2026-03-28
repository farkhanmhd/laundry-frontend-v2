import type React from "react";

export default function UserDashboardLayout({
  hero,
  recentDeliveries,
  recentOrders,
  quickActions,
  myRewards,
}: {
  hero: React.ReactNode;
  recentDeliveries: React.ReactNode;
  recentOrders: React.ReactNode;
  quickActions: React.ReactNode;
  myRewards: React.ReactNode;
}) {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {hero}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {recentDeliveries}
            {recentOrders}
          </div>
          <div className="row-start-1 space-y-6 lg:row-auto">
            {quickActions}
            {myRewards}
          </div>
        </div>
      </div>
    </div>
  );
}
