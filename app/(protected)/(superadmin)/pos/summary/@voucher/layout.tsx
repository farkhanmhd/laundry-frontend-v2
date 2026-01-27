import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cardShadowStyle } from "@/lib/utils";

const PosSummaryVoucherSlot = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="border-b [.border-b]:pb-3.5">
        <CardTitle className="font-semibold text-card-foreground text-lg">
          Vouchers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Type Voucher Code" />
            <Button>Apply</Button>
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default PosSummaryVoucherSlot;
