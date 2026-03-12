"use client";

import { useMutation } from "@tanstack/react-query";
import { MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { elysia } from "@/elysia";
import type { AccountAddress } from "@/lib/modules/account/data";
import { cardShadowStyle } from "@/lib/utils";
import { AddressForm } from "./address-form";
import { AddressFormProvider } from "./address-form-context";

interface AddressManagerProps {
  addresses?: AccountAddress[];
}

const deleteAddress = async (id: string) => {
  const { data: response } = await elysia.account.address({ id }).delete(
    { id },
    {
      fetch: {
        credentials: "include",
      },
    }
  );

  console.log({ response });

  return response;
};

export function AddressManager({ addresses }: AddressManagerProps) {
  const t = useTranslations("AccountSettings.addresses");
  const [isAdding, setIsAdding] = useState(false);
  const { refresh } = useRouter();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      refresh();
    },
    onError: () => {
      toast.error("Failed to delete address");
    },
  });

  const [viewingAddress, setViewingAddress] = useState<AccountAddress | null>(
    null
  );

  return (
    <div className="space-y-6" id="address">
      {/* 1. LIST VIEW */}
      {!(isAdding || viewingAddress) && (
        <Card style={cardShadowStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="w-full space-y-1.5">
              <div className="flex justify-between gap-3">
                <CardTitle className="font-semibold text-lg">
                  {t("title")}
                </CardTitle>
                {addresses && addresses?.length < 3 && (
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
            {addresses && addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-8">
                <div className="mb-3 rounded-full bg-blue-100/50 p-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("noAddresses")}
                </p>
              </div>
            ) : (
              addresses?.map((addr) => (
                <div className="space-y-4 rounded-lg border p-3" key={addr.id}>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{addr.label}</p>
                    <p className="text-muted-foreground text-sm">
                      {addr.street}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      disabled={isPending}
                      onClick={() => setViewingAddress(addr)}
                      variant="secondary"
                    >
                      {t("viewLocation")}
                    </Button>
                    <Button
                      disabled={isPending}
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
      {isAdding && !viewingAddress && (
        <AddressFormProvider onCancel={() => setIsAdding(false)}>
          <AddressForm />
        </AddressFormProvider>
      )}

      {/* 3. VIEW LOCATION DIALOG */}
      {!!viewingAddress && !isAdding && (
        <AddressFormProvider
          address={viewingAddress}
          onCancel={() => setViewingAddress(null)}
        >
          <AddressForm />
        </AddressFormProvider>
      )}
    </div>
  );
}
