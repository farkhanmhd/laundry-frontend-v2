"use client";

import { MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCustomerOrderDetail } from "./customer-order-detail-context";

type Props = {
  hasExistingDeliveries: boolean;
  labels: {
    readyForDelivery: string;
    homeDelivery: string;
    readyForDeliveryDescription: string;
    homeDeliveryDescription: string;
    requestDelivery: string;
    confirmAddress: string;
    cancel: string;
  };
  isReady: boolean;
};

export function RequestDeliverySection({
  hasExistingDeliveries,
  labels,
  isReady,
}: Props) {
  const {
    addresses,
    selectingAddress,
    setSelectingAddress,
    selectedAddress,
    setSelectedAddress,
    isRequestingDelivery,
    requestDelivery,
  } = useCustomerOrderDetail();

  return (
    <>
      {hasExistingDeliveries && <Separator className="bg-border" />}

      {selectingAddress ? (
        <div className="space-y-3">
          <p className="font-medium text-foreground text-sm">
            {labels.requestDelivery}
          </p>
          <div className="space-y-2">
            {addresses?.map((address) => (
              <button
                className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-secondary/50 ${
                  selectedAddress === address.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                disabled={isRequestingDelivery}
                key={address.id}
                onClick={() => setSelectedAddress(address.id)}
                type="button"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">{address.label}</p>
                  <p className="text-muted-foreground">{address.street}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              className="flex-1"
              disabled={isRequestingDelivery}
              onClick={() => {
                setSelectingAddress(false);
                setSelectedAddress(null);
              }}
              variant="outline"
            >
              {labels.cancel}
            </Button>
            <Button
              className="flex-1"
              disabled={!selectedAddress || isRequestingDelivery}
              onClick={requestDelivery}
            >
              {labels.confirmAddress}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-2 text-center">
          {!hasExistingDeliveries && (
            <div className="rounded-full bg-secondary/50 p-4">
              <Truck className="h-8 w-8 text-muted-foreground/50" />
            </div>
          )}
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              {isReady ? labels.readyForDelivery : labels.homeDelivery}
            </p>
            <p className="mx-auto max-w-xs text-muted-foreground text-sm">
              {isReady
                ? labels.readyForDeliveryDescription
                : labels.homeDeliveryDescription}
            </p>
          </div>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setSelectingAddress(true)}
          >
            {labels.requestDelivery}
          </Button>
        </div>
      )}
    </>
  );
}
