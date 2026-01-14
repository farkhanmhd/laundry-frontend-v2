import { LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/components/utils/client";
import { cardShadowStyle, cn, formatDate, getStatusColor } from "@/lib/utils";

interface OrderInfoProps {
  id: string;
  data: {
    status: string;
    createdAt: string;
  };
}

export const OrderInfoCard = ({ id, data }: OrderInfoProps) => {
  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 font-semibold text-base">
          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          Order Information
        </CardTitle>
        <Button className="h-8 text-xs" size="sm">
          Mark as Ready
        </Button>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">Order ID</span>
          <span className="font-medium font-mono text-foreground text-sm">
            #{id.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">Status</span>
          <div>
            <Badge
              className={cn(
                "px-2 py-0.5 text-[10px] uppercase shadow-none",
                getStatusColor(data.status)
              )}
              variant="outline"
            >
              {data.status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">Created At</span>
          <span className="font-medium text-foreground text-sm">
            <Client>{formatDate(data.createdAt)}</Client>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
