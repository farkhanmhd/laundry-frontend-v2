"use client";

import { MapPin, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AddressSchema } from "@/lib/modules/account/schema";
import { cardShadowStyle } from "@/lib/utils";
import { AddressForm } from "./address-form";
import { AddressFormProvider } from "./address-form-context";

type SavedAddress = AddressSchema & { id: string };

interface AddressManagerProps {
  initialAddresses?: SavedAddress[];
}

export function AddressManager({ initialAddresses = [] }: AddressManagerProps) {
  const t = useTranslations("AccountSettings.addresses");
  const [addresses, setAddresses] = useState<SavedAddress[]>(initialAddresses);
  const [isAdding, setIsAdding] = useState(false);

  // New state to track which address is being viewed in the modal
  const [viewingAddress, setViewingAddress] = useState<SavedAddress | null>(
    null
  );

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success(t("addressRemoved"));
  };

  return (
    <div className="space-y-6" id="address">
      {/* 1. LIST VIEW */}
      {!isAdding && (
        <Card style={cardShadowStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="w-full space-y-1.5">
              <div className="flex justify-between gap-3">
                <CardTitle className="font-semibold text-lg">
                  {t("title")}
                </CardTitle>
                {addresses.length < 3 && (
                  <Button
                    className="gap-2"
                    onClick={() => setIsAdding(true)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                    {t("addNew")}
                  </Button>
                )}
              </div>
              <CardDescription>{t("description")}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4">
            {addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-8">
                <div className="mb-3 rounded-full bg-blue-100/50 p-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("noAddresses")}
                </p>
              </div>
            ) : (
              addresses.map((addr) => (
                <div className="space-y-4 rounded-lg border p-3" key={addr.id}>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{addr.label}</p>
                    <p className="text-muted-foreground text-sm">
                      {addr.street}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() => setViewingAddress(addr)}
                      variant="secondary"
                    >
                      {t("viewLocation")}
                    </Button>
                    <Button
                      onClick={() => handleDelete(addr.id)}
                      variant="destructive"
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* 2. ADD FORM */}
      {isAdding && (
        <AddressFormProvider onCancel={() => setIsAdding(false)}>
          <AddressForm />
        </AddressFormProvider>
      )}

      {/* 3. VIEW LOCATION DIALOG */}
      <Dialog
        onOpenChange={(open) => !open && setViewingAddress(null)}
        open={!!viewingAddress}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewingAddress?.label}</DialogTitle>
          </DialogHeader>
          <div className="h-75 w-full overflow-hidden rounded-md border">
            {viewingAddress && <div>View Location</div>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
