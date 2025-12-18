"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Home, MapIcon, MapPin, Plus, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FormInput } from "@/components/forms/form-input";
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
import { Label } from "@/components/ui/label";
import { addAddressAction } from "@/lib/modules/account/actions";
import {
  type AddressSchema,
  addressSchema,
} from "@/lib/modules/account/schema";
import { cardShadowStyle } from "@/lib/utils";

// Lazy load Map
const MapPicker = dynamic(() => import("@/components/maps/map-picker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full animate-pulse items-center justify-center rounded-md bg-muted text-muted-foreground">
      Loading Map...
    </div>
  ),
});

type SavedAddress = AddressSchema & { id: string };

interface AddressManagerProps {
  initialAddresses?: SavedAddress[];
}

export default function AddressManager({
  initialAddresses = [],
}: AddressManagerProps) {
  const { refresh } = useRouter();
  const [addresses, setAddresses] = useState<SavedAddress[]>(initialAddresses);
  const [isAdding, setIsAdding] = useState(false);

  // New state to track which address is being viewed in the modal
  const [viewingAddress, setViewingAddress] = useState<SavedAddress | null>(
    null
  );

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    addAddressAction,
    zodResolver(addressSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: { label: "", street: "", lat: 0, lng: 0 },
      },
      actionProps: {
        onSettled: ({ result }) => {
          if (result?.data?.status === "success" && result.data.data) {
            toast.success(result.data.message);
            setAddresses((prev) => [
              ...prev,
              result.data?.data as SavedAddress,
            ]);
            handleCancel();
            refresh();
          } else if (result?.serverError) {
            toast.error("Something went wrong");
          }
        },
      },
    }
  );

  const handleCancel = () => {
    form.reset();
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success("Address removed");
  };

  return (
    <div className="space-y-6">
      {/* 1. LIST VIEW */}
      {!isAdding && (
        <Card style={cardShadowStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1.5">
              <CardTitle className="font-semibold text-2xl">
                Saved Addresses
              </CardTitle>
              <CardDescription>
                Manage your shipping locations (Max 3).
              </CardDescription>
            </div>

            {addresses.length < 3 && (
              <Button
                className="gap-2"
                onClick={() => setIsAdding(true)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            )}
          </CardHeader>

          <CardContent className="grid gap-4">
            {addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-8">
                <div className="mb-3 rounded-full bg-blue-100/50 p-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-muted-foreground text-sm">
                  No addresses saved yet.
                </p>
              </div>
            ) : (
              addresses.map((addr) => (
                <div
                  className="flex items-start justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/5"
                  key={addr.id}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-md bg-secondary p-2">
                      <Home className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium leading-none">{addr.label}</p>
                      <p className="text-muted-foreground text-sm">
                        {addr.street}
                      </p>

                      {/* --- CHANGED: View Location Button --- */}
                      <Button
                        className="flex h-auto items-center gap-1 p-0 text-blue-600 text-xs hover:no-underline"
                        onClick={() => setViewingAddress(addr)}
                        variant="link"
                      >
                        <MapIcon className="h-3 w-3" />
                        View Location
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDelete(addr.id)}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* 2. ADD FORM */}
      {isAdding && (
        <Card
          className="fade-in zoom-in-95 animate-in duration-200"
          style={cardShadowStyle}
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1.5">
              <CardTitle className="font-semibold text-2xl">
                New Address
              </CardTitle>
              <CardDescription>
                Pin your location on the map and fill in the details.
              </CardDescription>
            </div>
            <Button onClick={handleCancel} size="icon" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmitWithAction}
            >
              <FormInput
                disabled={action.isExecuting}
                form={form}
                label="Address Label"
                name="label"
                placeholder="e.g. Home, Office"
              />
              <FormInput
                disabled={action.isExecuting}
                form={form}
                label="Full Address"
                name="street"
                placeholder="Street name..."
              />

              <div className="space-y-3">
                <Label
                  className={
                    form.formState.errors.lat ? "text-destructive" : ""
                  }
                >
                  Pin Location *
                </Label>
                <div className="overflow-hidden rounded-md border">
                  <MapPicker
                    onLocationSelect={(lat, lng) => {
                      form.setValue("lat", lat, { shouldValidate: true });
                      form.setValue("lng", lng, { shouldValidate: true });
                    }}
                  />
                </div>
                {(form.formState.errors.lat || form.formState.errors.lng) && (
                  <p className="font-medium text-[0.8rem] text-destructive">
                    Please pin a location on the map.
                  </p>
                )}
              </div>

              <div className="fade-in slide-in-from-top-2 flex animate-in items-center gap-3 pt-2 duration-300">
                <Button disabled={action.isExecuting} type="submit">
                  {action.isExecuting ? "Saving..." : "Save Address"}
                </Button>
                <Button
                  className="gap-2 text-muted-foreground hover:text-foreground"
                  disabled={action.isExecuting}
                  onClick={handleCancel}
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
          <div className="h-[300px] w-full overflow-hidden rounded-md border">
            {viewingAddress && (
              <MapPicker
                // Key forces re-render when switching between different addresses
                initialPosition={[viewingAddress.lat, viewingAddress.lng]}
                key={viewingAddress.id}
                // Empty function effectively makes it "read-only" for selection purposes
                onLocationSelect={() => {}}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
