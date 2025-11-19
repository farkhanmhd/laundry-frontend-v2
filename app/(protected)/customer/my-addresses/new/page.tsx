"use client";

import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewAddressPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/customer/my-addresses");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/customer/my-addresses">
            <Button className="mb-4" size="sm" variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Addresses
            </Button>
          </Link>
          <h1 className="font-bold text-3xl">Add New Address</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Address Label */}
          <Card>
            <CardHeader>
              <CardTitle>Address Label</CardTitle>
            </CardHeader>
            <CardContent>
              <Label className="font-medium text-sm" htmlFor="label">
                Label (e.g., Home, Office)
              </Label>
              <Input
                className="mt-2"
                id="label"
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="Enter address label"
                required
                value={formData.label}
              />
            </CardContent>
          </Card>

          {/* Address Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-4 flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-muted-foreground text-sm">
                  [Interactive Map for Location Selection]
                </div>
              </div>
              <div>
                <Label className="font-medium text-sm" htmlFor="address">
                  Full Address
                </Label>
                <Textarea
                  className="mt-2"
                  id="address"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter your full address"
                  required
                  rows={3}
                  value={formData.address}
                />
              </div>
              <div>
                <Label className="font-medium text-sm" htmlFor="notes">
                  Delivery Notes (Optional)
                </Label>
                <Textarea
                  className="mt-2"
                  id="notes"
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any special instructions for delivery"
                  rows={2}
                  value={formData.notes}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Link className="flex-1" href="/customer/my-addresses">
              <Button className="w-full bg-transparent" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button className="flex-1" disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
