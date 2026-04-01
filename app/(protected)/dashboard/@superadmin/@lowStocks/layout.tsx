import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardShadowStyle, cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const LowStockLayout = ({ children }: Props) => {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Low Stock Inventory
          </CardTitle>
          <Link
            className={cn(buttonVariants({ variant: "secondary" }))}
            href="/inventories"
          >
            View All Inventories
          </Link>
        </div>
        <CardDescription>Items below safety stock level</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
};

export default LowStockLayout;
