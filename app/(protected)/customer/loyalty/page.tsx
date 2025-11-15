"use client";
import { Gift, History, TrendingUp, Zap } from "lucide-react";
import { PointsCard } from "@/components/loyalty/points-card";
import { TierProgress } from "@/components/loyalty/tier-progress";
import { TransactionHistory } from "@/components/loyalty/transaction-history";
import { VoucherGrid } from "@/components/loyalty/voucher-grid";
import { Button } from "@/components/ui/button";

export default function LoyaltyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl text-foreground">
            Loyalty Points
          </h1>
          <p className="text-muted-foreground">
            Earn and redeem rewards with every purchase
          </p>
        </div>

        {/* Points Overview */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <PointsCard
            highlight
            icon={<Zap className="h-5 w-5" />}
            label="Current Points"
            value="2,450"
          />
          <PointsCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Points This Month"
            value="+320"
          />
          <PointsCard
            icon={<Gift className="h-5 w-5" />}
            label="Points to Redeem"
            value="500"
          />
        </div>

        {/* Tier Progress */}
        <TierProgress />

        {/* Available Vouchers */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-2xl text-foreground">
              Available Vouchers
            </h2>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>
          <VoucherGrid />
        </div>

        {/* Transaction History */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-bold text-2xl text-foreground">
              <History className="h-6 w-6" />
              Transaction History
            </h2>
            <Button size="sm" variant="outline">
              Export
            </Button>
          </div>
          <TransactionHistory />
        </div>
      </div>
    </main>
  );
}
