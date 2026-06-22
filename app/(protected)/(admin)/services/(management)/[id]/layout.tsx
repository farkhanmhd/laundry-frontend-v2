"use client";

import { useTranslations } from "next-intl";
import type React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle } from "@/lib/utils";

const ServiceDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Services");

  const tabLists = [
    {
      label: t("form.serviceData"),
      value: "service",
    },
    {
      label: t("imageForm.title"),
      value: "image",
    },
  ];

  return (
    <div className="h-full p-6 lg:mx-auto lg:max-w-5xl">
      <Tabs className="gap-6" defaultValue="service">
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

export default ServiceDetailLayout;
