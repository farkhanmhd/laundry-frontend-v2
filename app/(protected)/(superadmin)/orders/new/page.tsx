/** biome-ignore-all lint/style/useBlockStatements: temporary */
/** biome-ignore-all lint/correctness/useParseIntRadix: temporary */
"use client";

import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OrderItem {
  serviceId: string;
  serviceName: string;
  quantity: number;
  price: number;
}

const serviceOptions = [
  { id: "s-001", name: "Express Wash", price: 50_000 },
  { id: "s-002", name: "Premium Dry Clean", price: 75_000 },
  { id: "s-003", name: "Ironing Service", price: 35_000 },
  { id: "s-004", name: "Fabric Treatment", price: 40_000 },
];

export default function NewOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedService, setSelectedService] = useState(
    searchParams.get("service") || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    if (!selectedService) {
      return;
    }
    const service = serviceOptions.find((s) => s.id === selectedService);
    if (!service) {
      return;
    }

    const existingItem = items.find((i) => i.serviceId === selectedService);
    if (existingItem) {
      setItems(
        items.map((i) =>
          i.serviceId === selectedService
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          serviceId: selectedService,
          serviceName: service.name,
          quantity,
          price: service.price,
        },
      ]);
    }
    setSelectedService("");
    setQuantity(1);
  };

  const removeItem = (serviceId: string) => {
    setItems(items.filter((i) => i.serviceId !== serviceId));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/customer/my-orders");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/customer/my-orders">
            <Button className="mb-4" size="sm" variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <h1 className="font-bold text-3xl">Create New Order</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Service Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Add Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="service">Service</Label>
                  <select
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    id="service"
                    onChange={(e) => setSelectedService(e.target.value)}
                    value={selectedService}
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(service.price)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    className="mt-2"
                    id="quantity"
                    min="1"
                    onChange={(e) =>
                      setQuantity(Number.parseInt(e.target.value) || 1)
                    }
                    type="number"
                    value={quantity}
                  />
                </div>
              </div>
              <Button
                className="w-full"
                disabled={!selectedService}
                onClick={addItem}
                type="button"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Order
              </Button>
            </CardContent>
          </Card>

          {/* Order Items */}
          {items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      className="flex items-center justify-between rounded-lg border p-3"
                      key={item.serviceId}
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.serviceName}</p>
                        <p className="text-muted-foreground text-sm">
                          Qty: {item.quantity} × Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(item.price)}
                        </p>
                      </div>
                      <div className="mr-4 text-right">
                        <p className="font-bold">
                          Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>
                      <Button
                        onClick={() => removeItem(item.serviceId)}
                        size="sm"
                        type="button"
                        variant="ghost"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Special Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                className="mt-2"
                id="notes"
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests or instructions..."
                rows={3}
                value={notes}
              />
            </CardContent>
          </Card>

          {/* Order Summary */}
          {items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>
                    Rp {new Intl.NumberFormat("id-ID").format(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3 font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    Rp {new Intl.NumberFormat("id-ID").format(subtotal)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Link className="flex-1" href="/customer/my-orders">
              <Button className="w-full bg-transparent" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              className="flex-1"
              disabled={items.length === 0 || isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating..." : "Create Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
