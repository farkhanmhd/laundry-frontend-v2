"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle, salesTabLists } from "@/lib/utils";

interface SalesTablesLayoutProps {
  children: React.ReactNode;
  overview: React.ReactNode;
  orders: React.ReactNode;
}

const SalesTablesLayout = ({
  children,
  overview,
  orders,
}: SalesTablesLayoutProps) => {
  const [selectedTab, setSelectedTab] = useState<
    (typeof salesTabLists)[number] | (string & {})
  >("overview");
  const toolbar = {
    overview,
    orders,
  };

  const selectedToolbar =
    selectedTab === "items"
      ? toolbar.overview
      : toolbar[selectedTab as keyof typeof toolbar];

  return (
    <Tabs
      className="gap-6"
      defaultValue="overview"
      onValueChange={setSelectedTab}
      value={selectedTab}
    >
      <div className="flex items-center justify-between">
        <TabsList style={cardShadowStyle}>
          {salesTabLists.map((tab) => (
            <TabsTrigger className="capitalize" key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex gap-1">{selectedToolbar}</div>
      </div>
      {children}
    </Tabs>
  );
};

export default SalesTablesLayout;
