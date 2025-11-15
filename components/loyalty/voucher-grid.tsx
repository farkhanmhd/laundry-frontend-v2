"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockVouchers = [
  {
    id: "v-1",
    name: "10% Discount",
    pointsCost: 500,
    discountAmount: 50_000,
    isAvailable: true,
  },
  {
    id: "v-2",
    name: "Free Express Delivery",
    pointsCost: 750,
    discountAmount: 0,
    isAvailable: true,
  },
  {
    id: "v-3",
    name: "25% Service Discount",
    pointsCost: 1000,
    discountAmount: 100_000,
    isAvailable: false,
  },
  {
    id: "v-4",
    name: "Free Laundry Bundle",
    pointsCost: 1200,
    discountAmount: 150_000,
    isAvailable: true,
  },
  {
    id: "v-5",
    name: "Priority Processing",
    pointsCost: 600,
    discountAmount: 0,
    isAvailable: true,
  },
  {
    id: "v-6",
    name: "Premium Care Package",
    pointsCost: 2000,
    discountAmount: 200_000,
    isAvailable: false,
  },
];

export function VoucherGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockVouchers.map((voucher) => (
        <Card
          className={voucher.isAvailable ? "" : "opacity-50"}
          key={voucher.id}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg">{voucher.name}</CardTitle>
              {voucher.isAvailable ? (
                <Badge className="whitespace-nowrap" variant="default">
                  Available
                </Badge>
              ) : (
                <Badge className="whitespace-nowrap" variant="secondary">
                  Locked
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-muted-foreground text-sm">
                  Points Required
                </p>
                <p className="font-bold text-2xl text-foreground">
                  {voucher.pointsCost.toLocaleString()}
                </p>
              </div>
              {voucher.discountAmount > 0 && (
                <div>
                  <p className="mb-1 text-muted-foreground text-sm">Value</p>
                  <p className="font-semibold text-lg text-primary">
                    Rp {voucher.discountAmount.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
              <Button
                className="w-full"
                disabled={!voucher.isAvailable}
                variant={voucher.isAvailable ? "default" : "outline"}
              >
                {voucher.isAvailable ? "Redeem" : "Unlock Soon"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
