import type React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

export interface SalesCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: number | string;
}

export const SalesCard = ({
  title,
  description,
  icon,
  value,
}: SalesCardProps) => {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="font-medium text-accent-foreground">
            {title}
          </CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="font-semibold text-3xl">{value}</CardContent>
      <CardFooter className="text-muted-foreground">{description}</CardFooter>
    </Card>
  );
};
