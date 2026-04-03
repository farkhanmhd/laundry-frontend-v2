import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  description: string;
  valueClassName?: string;
  children: React.ReactNode;
}

export function MetricCard({
  title,
  description,
  valueClassName,
  children,
}: MetricCardProps) {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className={cn("font-bold text-4xl", valueClassName)}>
          {children}
        </CardTitle>
      </CardHeader>
      <CardFooter className="pt-0 text-muted-foreground text-sm">
        {description}
      </CardFooter>
    </Card>
  );
}
