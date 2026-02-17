"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { SalesReportTitle } from "@/components/features/sales/sales-report-title";
import { useSalesTab } from "@/components/features/sales/sales-state";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle, salesTabLists } from "@/lib/utils";

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
                value={tabItem.value}
              >
                {t(tabItem.value)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full">
              <SalesReportTitle />
            </div>
            <div className="flex gap-1">
              {date}
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
