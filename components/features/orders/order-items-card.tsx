import { ShoppingBag } from "lucide-react";
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
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

// Define the shape based on your usage
interface OrderItem {
  id: string;
  name: string;
  note?: string | null;
  itemtype: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface OrderItemsCardProps {
  items: OrderItem[];
}

export const OrderItemsCard = ({ items }: OrderItemsCardProps) => {
  // Logic: Calculate totals derived from items
  const subTotal = items
    .filter((item) => item.itemtype !== "voucher")
    .reduce((acc, curr) => acc + curr.subtotal, 0);

  const discount =
    items.find((item) => item.itemtype === "voucher")?.subtotal || 0;

  const total = subTotal - discount;

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
                    {/* ITEM NOTE */}
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
      <div className="border-t px-6 pt-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <Client>
              <span className="font-medium">{formatToIDR(subTotal)}</span>
            </Client>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <Client>
                <span className="font-medium text-destructive">
                  -{formatToIDR(discount)}
                </span>
              </Client>
            </div>
          )}
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Total</span>
            <Client>
              <span className="font-bold text-2xl text-primary">
                {formatToIDR(total)}
              </span>
            </Client>
          </div>
        </div>
      </div>
    </Card>
  );
};
