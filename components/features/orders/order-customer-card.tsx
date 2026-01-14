import { Crown, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

// Define the shape based on your data source
interface OrderCustomerProps {
  data: {
    name: string | null;
    phone: string | null;
    memberId: string | null;
  };
}

export const OrderCustomerCard = ({ data }: OrderCustomerProps) => {
  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b">
        <CardTitle className="flex items-center gap-2 font-semibold text-base">
          <User className="h-4 w-4 text-muted-foreground" />
          Customer Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 sm:grid-cols-2">
        {/* Field 1: Customer Name & Member Badge */}
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">Customer Name</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{data.name}</span>
            {data.memberId && (
              <Badge
                className="flex h-5 items-center gap-1 border border-amber-200 bg-amber-100 px-1.5 py-0 font-semibold text-[10px] text-amber-600 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-400"
                variant="secondary"
              >
                <Crown className="h-3 w-3" />
                MEMBER
              </Badge>
            )}
          </div>
        </div>

        {/* Field 2: Phone Number */}
        {data.phone && (
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Phone Number</span>
            <span className="font-medium text-foreground">{data.phone}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
