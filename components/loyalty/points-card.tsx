import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PointsCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  highlight?: boolean;
}

export function PointsCard({ label, value, icon, highlight }: PointsCardProps) {
  return (
    <Card
      className={
        highlight ? "border-primary bg-primary text-primary-foreground" : ""
      }
    >
      <CardContent className="pt-6">
        <div className="mb-4 flex items-start justify-between">
          <span
            className={`font-medium text-sm ${highlight ? "opacity-90" : "text-muted-foreground"}`}
          >
            {label}
          </span>
          <div
            className={`rounded-lg p-2 ${highlight ? "bg-primary-foreground/20" : "bg-muted"}`}
          >
            {icon}
          </div>
        </div>
        <p
          className={`font-bold text-3xl ${highlight ? "text-primary-foreground" : "text-foreground"}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
