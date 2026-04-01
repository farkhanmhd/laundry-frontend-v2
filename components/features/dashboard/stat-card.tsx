import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  change?: number;
  subtext?: string;
  valueColor?: string;
}

export const StatCard = ({
  label,
  value,
  valueColor = "text-foreground",
}: StatCardProps) => (
  <Card style={cardShadowStyle}>
    <CardHeader className="pb-2">
      <CardDescription>{label}</CardDescription>
      <CardTitle className={cn("font-bold text-2xl", valueColor)}>
        {typeof value === "number" && value > 100_000
          ? `Rp${(value / 1_000_000).toFixed(1)}M`
          : value}
      </CardTitle>
    </CardHeader>
  </Card>
);
