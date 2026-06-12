"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type React from "react";
import { useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="h-full p-6 lg:mx-auto lg:max-w-7xl">
      <Tabs
        className="relative lg:flex-row lg:gap-8"
        onValueChange={onTabChange}
        value={activeTab}
      >
        <TabsList className="h-full gap-2 bg-background px-0 lg:sticky lg:top-0 lg:w-50 lg:flex-col lg:gap-2">
          {tabLists.map((tab) => (
            <TabsTrigger
              className="cursor-pointer rounded-none border-x-0 border-b-2 border-b-background px-0 text-muted-foreground hover:text-primary data-[state=active]:border-x-0 data-[state=active]:border-b-2 data-[state=active]:border-b-primary/70 data-[state=active]:text-primary lg:w-full lg:justify-start lg:rounded-md lg:border-none lg:px-4 lg:py-2 lg:text-muted-foreground lg:data-[state=active]:border-none lg:data-[state=active]:bg-sidebar-accent lg:data-[state=active]:text-primary lg:hover:bg-sidebar-accent dark:data-[state=active]:border-t-background dark:data-[state=active]:border-b-primary dark:data-[state=active]:bg-background dark:data-[state=active]:text-primary dark:data[state=active]:text-primary lg:dark:data-[state=active]:bg-sidebar-accent dark:hover:text-primary"
              key={tab.value}
              value={tab.value}
            >
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
