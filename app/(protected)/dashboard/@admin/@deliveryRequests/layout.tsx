import { ArrowUpCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, cn } from "@/lib/utils";

export default function DeliveryRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <ArrowUpCircle className="h-5 w-5 text-primary" />
          Delivery Requests
        </CardTitle>
        <CardDescription>Outgoing finished orders</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
      <CardFooter className="mt-auto">
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          href="/deliveries"
        >
          View All Deliveries
        </Link>
      </CardFooter>
    </Card>
  );
}
