"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type React from "react";
import { useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle } from "@/lib/utils";

const ProductDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Inventories");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeTab = searchParams.get("tab") || "inventory";

  const onTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === "inventory") {
        params.delete("tab");
      } else {
        params.set("tab", value);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  const tabLists = [
    {
      label: t("form.inventoryData"),
      value: "inventory",
    },
    {
      label: t("imageForm.title"),
      value: "image",
    },
    {
      label: t("stockForm.title"),
      value: "stock",
    },
    {
      label: t("restockForm.title"),
      value: "restock",
    },
    {
      label: t("logs.movementTab"),
      value: "movement",
    },
  ];

  return (
    <div className="h-[calc(100dvh-128px)] p-6 md:h-[calc(100dvh-64px)]">
      <Tabs className="gap-6" onValueChange={onTabChange} value={activeTab}>
        <TabsList
          className="w-5xl self-center bg-background data-[variant=line]:rounded-lg"
          style={cardShadowStyle}
          variant="line"
        >
          {tabLists.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
};

export default ProductDetailLayout;
