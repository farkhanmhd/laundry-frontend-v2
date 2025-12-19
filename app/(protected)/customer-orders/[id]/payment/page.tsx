"use client";

import { ArrowLeft, CheckCircle2, Download, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/components/utils/client";
import { cardShadowStyle, formatDate } from "@/lib/utils"; // Assuming utils exist

// Helper for currency formatting
const formatToIDR = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  // --- MOCK DATA (Replace with your actual data fetching) ---
  const order = {
    id: orderId,
    total: 165_000,
    subtotal: 185_000,
    discount: 20_000,
    payment: {
      // CHANGE THIS TO 'pending' OR 'settlement' TO SEE THE DIFFERENT STATES
      status: "pending",
      method: "qris",
      paidAt: new Date().toISOString(),
    },
  };
  // ---------------------------------------------------------

  // --- VIEW 1: SUCCESS STATE ---
  if (order.payment.status === "settlement") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6">
        <Card className="w-full max-w-md text-center" style={cardShadowStyle}>
          <CardContent className="space-y-6 pt-10 pb-10">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-2xl tracking-tight">
                Payment Successful!
              </h2>
              <p className="text-muted-foreground">
                Thank you for your payment. Your order is now being processed.
              </p>
            </div>

            <div className="space-y-3 rounded-lg border bg-muted/50 p-4 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-medium font-mono uppercase">
                  {orderId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <Client>
                  <span className="font-medium">
                    {formatDate(order.payment.paidAt)}
                  </span>
                </Client>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium uppercase">
                  {order.payment.method}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-bold">
                <span>Total Paid</span>
                <Client>
                  <span className="text-lg text-primary">
                    {formatToIDR(order.total)}
                  </span>
                </Client>
              </div>
            </div>

            <div className="pt-2">
              <Button
                className="w-full gap-2"
                onClick={() => router.push(`/orders/${orderId}`)}
                size="lg" // Adjust route as needed
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Order Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- VIEW 2: PENDING / QRIS SCAN STATE ---
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Order Summary */}
        <Card style={cardShadowStyle}>
          <CardHeader className="pb-4">
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Order ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium font-mono text-sm uppercase">
                    {orderId}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatToIDR(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-green-600 text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span>-{formatToIDR(order.discount)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed pt-3 font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-primary">{formatToIDR(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card
          className="overflow-hidden border-primary/20"
          style={cardShadowStyle}
        >
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Scan to Pay</CardTitle>
            <CardDescription>
              Scan the QRIS code below with your preferred payment app.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                alt="QRIS Code"
                className="h-50 w-50 rounded-md object-contain"
                height={200}
                priority // Replace with real QR data
                src="/placeholder.svg"
                width={200}
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3 bg-muted/20 pt-6">
            <Button className="w-full gap-2" size="lg">
              <RefreshCw className="h-4 w-4" />
              Check Payment Status
            </Button>
            <Button className="w-full gap-2" variant="outline">
              <Download className="h-4 w-4" />
              Save QR Image
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
