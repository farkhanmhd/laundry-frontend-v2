"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { SalesReportTitle } from "@/components/features/sales/sales-report-title";
import { useSalesTab } from "@/components/features/sales/sales-state";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle, cn, salesTabLists } from "@/lib/utils";

interface SalesTablesLayoutProps {
  children: React.ReactNode;
  overview: React.ReactNode;
  orders: React.ReactNode;
  cards: React.ReactNode;
  date: React.ReactNode;
}

const SalesLayout = ({
  children,
  overview,
  orders,
  cards,
  date,
}: SalesTablesLayoutProps) => {
  const { tab, setTab } = useSalesTab();
  const t = useTranslations("Sales.tabs");

  const toolbar = {
    overview,
    orders,
  };

  const selectedToolbar =
    tab === "items" ? toolbar.overview : toolbar[tab as keyof typeof toolbar];
  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      <Tabs
        className="gap-6"
        defaultValue="overview"
        onValueChange={setTab}
        value={tab}
      >
        <div className="flex items-center justify-between">
          <TabsList style={cardShadowStyle}>
            {salesTabLists.map((tabItem) => (
              <TabsTrigger
                className="capitalize"
                key={tabItem.value}
                style={cardShadowStyle}
                value={tabItem.value}
              >
                {t(tabItem.value)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="w-full">
              <SalesReportTitle />
            </div>
            <div
              className={cn("grid w-full gap-2", {
                "grid-cols-2 xl:grid-cols-4": tab === "orders",
                "grid-cols-3 xl:grid-cols-5": tab === "overview",
              })}
            >
              <div
                className={cn({
                  "col-span-3 xl:col-span-2": tab === "overview",
                  "col-span-2": tab === "orders",
                })}
              >
                {date}
              </div>
              <Button style={cardShadowStyle} variant="outline">
                <Download />
                Export
              </Button>
              {selectedToolbar}
            </div>
          </div>
          {cards}
          {children}
        </div>
      </Tabs>
    </section>
  );
};

export default SalesLayout;
