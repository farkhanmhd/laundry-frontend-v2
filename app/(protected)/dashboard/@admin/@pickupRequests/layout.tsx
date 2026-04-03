import { ArrowDownCircle } from "lucide-react";
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

export default function PickupRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <ArrowDownCircle className="h-5 w-5 text-primary" />
          Pickup Requests
        </CardTitle>
        <CardDescription>Incoming laundry from customers</CardDescription>
      </CardHeader>
      {/* The content (page, loading, or error) will be injected here */}
      <CardContent className="grid gap-4">{children}</CardContent>
      <CardFooter className="mt-auto">
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          href="/pickups"
        >
          View All Pickups
        </Link>
      </CardFooter>
    </Card>
  );
}
