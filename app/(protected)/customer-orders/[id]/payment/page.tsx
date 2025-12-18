"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "qris",
    name: "QRIS",
    icon: "📱",
    description: "Quick Response Code for instant transfer",
  },
  {
    id: "cash",
    name: "Cash Payment",
    icon: "💵",
    description: "Pay with cash upon delivery",
  },
];

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [isProcessing, setIsProcessing] = useState(false);

  const orderTotal = 165_000; // Mock amount from order

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Redirect to order detail page
    router.push(`/customer/my-orders/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/customer/my-orders/${orderId}`}>
            <Button className="mb-4" size="sm" variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Order
            </Button>
          </Link>
          <h1 className="font-bold text-3xl">Payment</h1>
          <p className="mt-1 text-muted-foreground">Order {orderId}</p>
        </div>

        {/* Order Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>Rp 185.000</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="text-muted-foreground">Discount:</span>
                <span>-Rp 20.000</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-bold text-lg">
                <span>Total Amount:</span>
                <span>
                  Rp {new Intl.NumberFormat("id-ID").format(orderTotal)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
            <CardDescription>Choose how you want to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={setSelectedMethod}
              value={selectedMethod}
            >
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    className="flex cursor-pointer items-center space-x-4 rounded-lg border p-4 transition hover:bg-accent"
                    key={method.id}
                  >
                    <RadioGroupItem id={method.id} value={method.id} />
                    <Label
                      className="flex-1 cursor-pointer"
                      htmlFor={method.id}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {/* Payment Details */}
            <div className="mt-8 rounded-lg bg-muted p-4">
              {selectedMethod === "qris" && (
                <div className="text-center">
                  <p className="mb-4 font-medium text-sm">
                    Scan QR Code to complete payment
                  </p>
                  <div className="mb-4 inline-block rounded-lg bg-white p-4">
                    <div className="flex h-40 w-40 items-center justify-center rounded bg-gray-200 text-muted-foreground text-sm">
                      [QR Code Here]
                    </div>
                  </div>
                  <p className="mt-2 text-muted-foreground text-xs">
                    Valid for 15 minutes
                  </p>
                </div>
              )}
              {selectedMethod === "cash" && (
                <div>
                  <p className="text-sm">
                    Pay{" "}
                    <span className="font-bold">
                      Rp {new Intl.NumberFormat("id-ID").format(orderTotal)}
                    </span>{" "}
                    in cash when the order is delivered.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3">
              <Link className="flex-1" href={`/customer/my-orders/${orderId}`}>
                <Button className="w-full bg-transparent" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                className="flex-1"
                disabled={isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? "Processing..." : "Complete Payment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
