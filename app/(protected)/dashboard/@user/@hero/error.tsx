"use client";

import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

export default function HeroError() {
  return (
    <Card className="border-destructive" style={cardShadowStyle}>
      <CardContent className="flex items-center gap-3 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <p className="font-medium text-sm">Failed to load user profile.</p>
      </CardContent>
    </Card>
  );
}
