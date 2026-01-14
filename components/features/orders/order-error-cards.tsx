"use client";

import {
  AlertCircle,
  Bike,
  LayoutDashboard,
  type LucideIcon,
  RotateCcw,
  ShoppingBag,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { cardShadowStyle, cn } from "@/lib/utils";

// Standard props for Next.js error components
interface ErrorCardProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  className?: string;
}

// Internal reusable wrapper to ensure visual consistency with the main cards
const BaseErrorCard = ({
  icon: Icon,
  title,
  label,
  reset,
  className,
}: {
  icon: LucideIcon;
  title: string;
  label: string;
  reset?: () => void;
  className?: string;
}) => {
  return (
    <Card className={cn("w-full", className)} style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 font-semibold text-base">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="flex min-h-[150px] items-center justify-center p-6 pt-0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
            </EmptyMedia>
            <EmptyTitle className="font-semibold text-sm">
              Failed to load {label}
            </EmptyTitle>
            <EmptyDescription className="text-xs">
              We encountered an issue retrieving the {label.toLowerCase()}.
            </EmptyDescription>
          </EmptyHeader>
          {reset && (
            <EmptyContent>
              <Button
                className="gap-2 text-xs"
                onClick={reset}
                size="sm"
                variant="outline"
              >
                <RotateCcw className="h-3 w-3" />
                Try Again
              </Button>
            </EmptyContent>
          )}
        </Empty>
      </CardContent>
    </Card>
  );
};

// ----------------------------------------------------------------------
// 1. Order Items Error
// ----------------------------------------------------------------------
export const OrderItemsError = (props: ErrorCardProps) => {
  return (
    <BaseErrorCard
      {...props}
      icon={ShoppingBag}
      label="Items"
      title="Order Items"
    />
  );
};

// ----------------------------------------------------------------------
// 2. Order Delivery Error
// ----------------------------------------------------------------------
export const OrderDeliveryError = (props: ErrorCardProps) => {
  return (
    <BaseErrorCard
      {...props}
      icon={Bike}
      label="Delivery Details"
      title="Logistics"
    />
  );
};

// ----------------------------------------------------------------------
// 3. Order Payment Error
// ----------------------------------------------------------------------
export const OrderPaymentError = (props: ErrorCardProps) => {
  return (
    <BaseErrorCard
      {...props}
      icon={Wallet}
      label="Payment"
      title="Payment Information"
    />
  );
};

// ----------------------------------------------------------------------
// 4. Order Customer Error
// ----------------------------------------------------------------------
export const OrderCustomerError = (props: ErrorCardProps) => {
  return (
    <BaseErrorCard
      {...props}
      icon={User}
      label="Customer"
      title="Customer Details"
    />
  );
};

// ----------------------------------------------------------------------
// 5. Order Information Error (Top Card)
// ----------------------------------------------------------------------
export const OrderInfoError = (props: ErrorCardProps) => {
  return (
    <BaseErrorCard
      {...props}
      icon={LayoutDashboard}
      label="Order Details"
      title="Order Information"
    />
  );
};
