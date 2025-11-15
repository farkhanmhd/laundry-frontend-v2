import type React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SelectItem = {
  label: string;
  value: string;
};

const tabLists: SelectItem[] = [
  {
    label: "Inventory Data",
    value: "inventory",
  },
  {
    label: "Image",
    value: "image",
  },
  {
    label: "Stock",
    value: "stock",
  },
];

const ProductDetailLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full p-6 lg:mx-auto lg:max-w-6xl">
    <Tabs className="lg:flex-row lg:gap-8" defaultValue="inventory">
      <TabsList className="h-full gap-3 lg:w-50 lg:flex-col lg:gap-2 lg:bg-background">
        {tabLists.map((tab) => (
          <TabsTrigger
            className="cursor-pointer text-muted-foreground data-[state=active]:border-background data-[state=active]:bg-background data-[state=active]:text-primary lg:w-full lg:justify-start lg:border-none lg:px-4 lg:py-2 lg:text-muted-foreground lg:data-[state=active]:border-none lg:data-[state=active]:bg-secondary lg:data-[state=active]:text-primary lg:hover:bg-secondary dark:data-[state=active]:border-background dark:data-[state=active]:bg-background lg:dark:data-[state=active]:bg-secondary"
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

export default ProductDetailLayout;
