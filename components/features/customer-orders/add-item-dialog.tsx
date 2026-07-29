"use client";

import { Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { CustomerItemCatalog } from "@/lib/modules/customer-orders/schema";
import { cn, formatToIDR } from "@/lib/utils";
import { useCustomerOrderDetail } from "./customer-order-detail-context";

export const AddItemFromCatalogDialog = () => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const { catalogs, addItem, data } = useCustomerOrderDetail();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCatalogs = catalogs.filter((catalog) => {
    const isAlreadyAdded = data.some(
      (item) =>
        item.catalogId === catalog.id && item.itemType === catalog.itemType
    );
    if (isAlreadyAdded) {
      return false;
    }
    if (!search) {
      return true;
    }
    return catalog.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleAdd = (catalog: CustomerItemCatalog) => {
    addItem(catalog);
    setOpen(false);
    setSearch("");
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <Plus className="mr-1 h-4 w-4" />
          {t("addItem")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("addItemFromCatalog")}</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchCatalog")}
            value={search}
          />
        </div>
        <div className="space-y-2">
          {filteredCatalogs.length === 0 && (
            <p className="py-8 text-center text-muted-foreground text-sm">
              {t("noItemsFound")}
            </p>
          )}
          {filteredCatalogs.map((catalog) => (
            <button
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 text-left transition-colors hover:bg-accent"
              key={catalog.id}
              onClick={() => handleAdd(catalog)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAdd(catalog);
                }
              }}
              tabIndex={0}
              type="button"
            >
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-medium text-sm">
                  {catalog.name}
                </p>
                <p className="line-clamp-1 text-muted-foreground text-xs">
                  {catalog.description}
                </p>
                <span
                  className={cn(
                    "mt-1 inline-block rounded-sm bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground uppercase tracking-wider"
                  )}
                >
                  {catalog.itemType}
                </span>
              </div>
              <div className="ml-3 shrink-0 text-right">
                <p className="font-semibold text-sm">
                  {formatToIDR(catalog.price)}
                </p>
                <Plus className="mt-1 ml-auto h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
