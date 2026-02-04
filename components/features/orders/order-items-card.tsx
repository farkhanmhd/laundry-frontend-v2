import { Coins, ShoppingBag, TicketPercent } from "lucide-react"; // Added Coins icon
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Client } from "@/components/utils/client";
import type { OrderDetailResponse } from "@/lib/modules/orders/data";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

interface OrderItemsCardProps {
  data: OrderDetailResponse;
}

export const OrderItemsCard = ({ data }: OrderItemsCardProps) => {
  const { items, voucher, points } = data;

  const subTotal = useMemo(
    () => items.reduce((acc, curr) => acc + curr.subtotal, 0),
    [items]
  );

  const finalTotal = useMemo(() => {
    const discount = voucher?.discountAmount ?? 0;
    const pointsUsed = points?.points ?? 0; // points is negative

    // Since points is negative, we add it to reduce the total
    return Math.max(0, subTotal + discount + pointsUsed);
  }, [subTotal, voucher, points]);

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          Order Items
        </CardTitle>
        <CardDescription>
          Services and products included in this order
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%] pl-6">Item Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="pr-6 text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  className="align-top hover:bg-transparent"
                  key={item.id}
                >
                  <TableCell className="pl-6">
                    <div className="font-medium text-base">{item.name}</div>
                    {item.note && (
                      <div className="mt-2 flex items-start gap-2 rounded-md bg-muted p-2 text-muted-foreground">
                        <span className="font-medium text-xs italic leading-relaxed">
                          "{item.note}"
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="font-normal capitalize shadow-none"
                      variant="secondary"
                    >
                      {item.itemtype}
                    </Badge>
                  </TableCell>
                  <TableCell className="pt-4 text-right">
                    <Client>{formatToIDR(item.price)}</Client>
                  </TableCell>
                  <TableCell className="pt-4 text-right">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="pt-4 pr-6 text-right font-bold text-foreground">
                    <Client>{formatToIDR(item.subtotal)}</Client>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>

      {/* Footer Summary */}
      <div className="border-t px-6 py-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <Client>
              <span className="font-medium">{formatToIDR(subTotal)}</span>
            </Client>
          </div>

          {/* Voucher Section */}
          {voucher && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1 font-medium text-green-600">
                  <TicketPercent className="h-4 w-4" />
                  Voucher <span className="uppercase">{voucher.code}</span>
                </span>
                <Client>
                  <span className="font-medium text-green-600">
                    {formatToIDR(voucher.discountAmount)}
                  </span>
                </Client>
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                {voucher.description}
              </p>
            </div>
          )}

          {/* Points Section */}
          {points && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 font-medium text-green-600">
                <Coins className="h-4 w-4" />
                Points Redeemed
              </span>
              <Client>
                <span className="font-medium text-green-600">
                  {formatToIDR(points.points)}
                </span>
              </Client>
            </div>
          )}

          <Separator className="my-2" />

          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Total</span>
            <Client>
              <span className="font-bold text-2xl text-primary">
                {formatToIDR(finalTotal)}
              </span>
            </Client>
          </div>
        </div>
      </div>
    </Card>
  );
};
