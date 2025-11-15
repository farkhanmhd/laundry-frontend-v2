"use client";

import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function NewDeliveryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    orderId: "",
    addressId: "",
    type: "pickup" as "pickup" | "dropoff",
    notes: "",
  });

  const orders = [
    { id: "o-12345", label: "Express Wash - Rp 50.000" },
    { id: "o-12346", label: "Premium Dry Clean - Rp 75.000" },
  ];

  const addresses = [
    { id: "addr-1", label: "Home - Jl. Merdeka 123" },
    { id: "addr-2", label: "Office - Jl. Sudirman 456" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/my-deliveries");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/my-deliveries">
            <Button className="mb-4" size="sm" variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Deliveries
            </Button>
          </Link>
          <h1 className="font-bold text-3xl">Request Delivery</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Order Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Order</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="order">Order</Label>
              <select
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                id="order"
                onChange={(e) =>
                  setFormData({ ...formData, orderId: e.target.value })
                }
                required
                value={formData.orderId}
              >
                <option value="">Select an order...</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.label}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Delivery Type */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Type</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    type: value as "pickup" | "dropoff",
                  })
                }
                value={formData.type}
              >
                <div className="mb-3 flex items-center space-x-2">
                  <RadioGroupItem id="pickup" value="pickup" />
                  <Label className="cursor-pointer" htmlFor="pickup">
                    Pickup - We collect from you
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="dropoff" value="dropoff" />
                  <Label className="cursor-pointer" htmlFor="dropoff">
                    Dropoff - We deliver to you
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Address Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="address">Address</Label>
              <select
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                id="address"
                onChange={(e) =>
                  setFormData({ ...formData, addressId: e.target.value })
                }
                required
                value={formData.addressId}
              >
                <option value="">Select an address...</option>
                {addresses.map((addr) => (
                  <option key={addr.id} value={addr.id}>
                    {addr.label}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                className="mt-2"
                id="notes"
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Any special instructions for delivery..."
                rows={3}
                value={formData.notes}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Link className="flex-1" href="/my-deliveries">
              <Button className="w-full bg-transparent" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              className="flex-1"
              disabled={
                !(formData.orderId && formData.addressId) || isSubmitting
              }
              type="submit"
            >
              {isSubmitting ? "Requesting..." : "Request Delivery"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
