"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle } from "@/lib/utils";

interface Props {
  inventory: React.ReactNode;
  adjustments: React.ReactNode;
  restocks: React.ReactNode;
  usage: React.ReactNode;
}

export function ReportsTabs({
  inventory,
  adjustments,
  restocks,
  usage,
}: Props) {
  const t = useTranslations("Inventories");
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "inventory";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <Tabs onValueChange={handleTabChange} value={activeTab}>
      <TabsList
        className="mb-4 bg-background data-[variant=line]:rounded-lg dark:bg-muted"
        style={cardShadowStyle}
        variant="line"
      >
        <TabsTrigger value="inventory">{t("title")}</TabsTrigger>
        <TabsTrigger value="adjustments">
          {t("logs.adjustmentButton")}
        </TabsTrigger>
        <TabsTrigger value="restocks">{t("logs.restockButton")}</TabsTrigger>
        <TabsTrigger value="usage">{t("logs.usageButton")}</TabsTrigger>
      </TabsList>
      <TabsContent value="inventory">{inventory}</TabsContent>
      <TabsContent value="adjustments">{adjustments}</TabsContent>
      <TabsContent value="restocks">{restocks}</TabsContent>
      <TabsContent value="usage">{usage}</TabsContent>
    </Tabs>
  );
}
