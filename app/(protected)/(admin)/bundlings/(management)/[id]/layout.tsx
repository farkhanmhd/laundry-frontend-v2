"use client";

import { useTranslations } from "next-intl";
import type React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle } from "@/lib/utils";

const ProductDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Bundlings");

  const tabLists = [
    {
      label: t("form.bundlingData"),
      value: "data",
    },
    {
      label: t("imageForm.title"),
      value: "image",
    },
    {
      label: t("itemsForm.bundlingItems"),
      value: "items",
    },
  ];

  return (
    <div className="h-full p-6 lg:mx-auto lg:max-w-5xl">
      <Tabs className="gap-6" defaultValue="data">
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
