import type React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SelectItem = {
  label: string;
  value: string;
};

const tabLists: SelectItem[] = [
  {
    label: "Service Data",
    value: "service",
  },
  {
    label: "Image",
    value: "image",
  },
];

const ServiceDetailLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full p-6 lg:mx-auto lg:max-w-6xl">
    <Tabs className="lg:flex-row lg:gap-8" defaultValue="service">
      <TabsList className="h-full gap-2 bg-background px-0 lg:w-50 lg:flex-col lg:gap-2">
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

export default ServiceDetailLayout;
