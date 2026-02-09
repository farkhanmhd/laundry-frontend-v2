import { TableSkeleton } from "@/components/table/table-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

export default function Loading() {
  return (
    <Card className="overflow-hidden p-0" style={cardShadowStyle}>
      <CardContent>
        <TableSkeleton />
      </CardContent>
    </Card>
  );
}
