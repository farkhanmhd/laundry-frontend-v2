"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

export default function MyRewardsError() {
  return (
    <Card className="border-destructive" style={cardShadowStyle}>
      <CardContent className="py-6 text-center text-muted-foreground text-sm">
        Failed to load rewards.
      </CardContent>
    </Card>
  );
}
