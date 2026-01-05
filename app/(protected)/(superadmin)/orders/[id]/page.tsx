"use client";

import { Banknote, Bike, CreditCard, StickyNote, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { cardShadowStyle } from "@/lib/utils";

const orderDetail = {
  id: "o-x9d2a",
  status: "processing", // enum: pending, processing, ready, completed
  createdAt: "2025-12-10T08:30:00Z",
  customerName: "Alice Johnson",

  member: {
    id: "c-9921",
    name: "Alice Johnson",
    phone: "+62 812-3456-7890",
    points: 1250,
  },

  items: [
    {
      id: "od-1",
      itemType: "service",
      quantity: 3,
      subtotal: 45_000,
      note: "Separate white shirts, heavy starch on collars",
      details: {
        name: "Express Wash & Fold",
        description: "Wash, dry, and fold service completed in 4 hours.",
        price: 15_000,
      },
    },
    {
      id: "od-2",
      itemType: "inventory",
      quantity: 1,
      subtotal: 25_000,
      note: null,
      details: {
        name: "Premium Laundry Bag",
        description: "Large reusable canvas bag.",
        price: 25_000,
      },
    },
    {
      id: "od-3",
      itemType: "service",
      quantity: 1,
      subtotal: 35_000,
      note: "Use hypoallergenic detergent if possible",
      details: {
        name: "Bedding Set Wash",
        description: "Complete care for sheets, pillowcases, and duvet covers.",
        price: 35_000,
      },
    },
  ],

  payment: {
    id: "pd-123",
    paymentType: "qris",
    total: 105_000,
    amountPaid: 105_000,
    change: 0,
    discountAmount: 0,
    transactionStatus: "settlement",
    transactionTime: "2025-12-10T08:35:00Z",
  },

  delivery: {
    id: "dlv-7m2q",
    type: "delivery",
    status: "assigned",
    address: {
      address: "Jl. Merpati No. 45, Medan, North Sumatra",
      label: "Home",
    },
    notes: "Please leave at the front gate security.",
    driver: "Ahmad",
  },
};

// --- HELPER FUNCTIONS ---

const formatCurrency = (amount: number) =>
  `Rp${amount.toLocaleString("id-ID")}`;

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString("en-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "processing":
      return "default";
    case "ready":
      return "default";
    case "completed":
      return "outline";
    default:
      return "secondary";
  }
};

export default function OrderDetailPage() {
  const order = orderDetail;

  return (
    <div className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-2xl tracking-tight">
                Order {order.id.toUpperCase()}
              </h1>
              <Badge
                variant={
                  getStatusColor(order.status) as
                    | "default"
                    | "secondary"
                    | "outline"
                }
              >
                {order.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="mt-1 text-muted-foreground text-sm">
            Created on {formatDate(order.createdAt)}
          </p>

          <Button className="gap-2 bg-primary hover:bg-primary/90">
            Mark as Ready
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN: Items & Payment */}
        <div className="space-y-6 lg:col-span-2">
          {/* ORDER ITEMS */}
          <Card style={cardShadowStyle}>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                Services and products included in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Item Details</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow
                        className="align-top hover:bg-transparent"
                        key={item.id}
                      >
                        <TableCell>
                          <div className="font-medium text-base">
                            {item.details.name}
                          </div>

                          {/* ITEM NOTE */}
                          {item.note && (
                            <div className="mt-2 flex items-start gap-2 rounded-md bg-muted p-2 text-muted-foreground">
                              <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                              <span className="font-medium text-xs italic leading-relaxed">
                                "{item.note}"
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="font-normal capitalize"
                            variant="secondary"
                          >
                            {item.itemType}
                          </Badge>
                        </TableCell>
                        <TableCell className="pt-4 text-right">
                          {formatCurrency(item.details.price)}
                        </TableCell>
                        <TableCell className="pt-4 text-right">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="pt-4 text-right font-bold">
                          {formatCurrency(item.subtotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
            <div className="border-t px-6 pt-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {formatCurrency(
                      order.payment.total + order.payment.discountAmount
                    )}
                  </span>
                </div>
                {order.payment.discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-destructive">
                      -{formatCurrency(order.payment.discountAmount)}
                    </span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">
                    {formatCurrency(order.payment.total)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* PAYMENT INFORMATION */}
          <Card style={cardShadowStyle}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Banknote className="h-5 w-5 text-muted-foreground" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">
                  Payment Method
                </p>
                <div className="flex items-center gap-2 font-medium">
                  {order.payment.paymentType === "qris" ? (
                    <CreditCard className="h-4 w-4" />
                  ) : (
                    <Banknote className="h-4 w-4" />
                  )}
                  {order.payment.paymentType?.toUpperCase()}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">
                  Status
                </p>
                <Badge
                  variant={
                    order.payment.transactionStatus === "settlement"
                      ? "default"
                      : "secondary"
                  }
                >
                  {order.payment.transactionStatus?.toUpperCase() || "PAID"}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">
                  Amount Paid
                </p>
                <p className="font-medium">
                  {formatCurrency(order.payment.amountPaid)}
                </p>
              </div>
              {order.payment.change !== undefined &&
                order.payment.change > 0 && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">
                      Change
                    </p>
                    <p className="font-medium">
                      {formatCurrency(order.payment.change)}
                    </p>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Customer, Delivery, Actions */}
        <div className="space-y-6">
          {/* CUSTOMER DETAILS */}
          <Card className="gap-3" style={cardShadowStyle}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-muted-foreground" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{order.member.name}</p>
              <span className="text-sm">{order.member.phone}</span>
            </CardContent>
          </Card>

          {/* DELIVERY INFORMATION */}
          {order.delivery && (
            <Card className="gap-2" style={cardShadowStyle}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Bike className="h-4 w-4 text-muted-foreground" />
                    Delivery Request
                  </CardTitle>
                  <Badge className="bg-background" variant="outline">
                    {order.delivery.type.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-start gap-2.5">
                    <div className="text-sm">
                      <span className="mb-0.5 block font-medium">
                        {order.delivery.address.label}
                      </span>
                      <span className="text-muted-foreground leading-snug">
                        {order.delivery.address.address}
                      </span>
                    </div>
                  </div>
                </div>

                {order.delivery.notes && (
                  <div className="space-y-3">
                    <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Instructions
                    </p>
                    <p className="rounded-md bg-muted p-2.5 text-muted-foreground text-sm">
                      "{order.delivery.notes}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
