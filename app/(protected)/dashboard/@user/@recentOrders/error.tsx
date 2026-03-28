"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

export default function RecentOrdersError() {
  return (
    <Card className="border-destructive" style={cardShadowStyle}>
      <CardContent className="py-6 text-center text-muted-foreground text-sm">
        Failed to load recent orders.
      </CardContent>
    </Card>
  );
}
