import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardShadowStyle } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

const RecentOrdersLayout = async ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="flex h-full flex-col" style={cardShadowStyle}>
        <Tabs className="flex w-full flex-1 flex-col" defaultValue="all">
          <CardHeader className="flex flex-col gap-4 pb-4">
            <div className="flex w-full items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Overview of latest transactions
                </CardDescription>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/orders">View All Orders</Link>
              </Button>
            </div>
            {/* FIX: h-auto and flex-wrap ensure Tabs wrap correctly and don't overlap list content */}
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
              {["All", "Pending", "Processing", "Ready", "Completed"].map(
                (status) => (
                  <TabsTrigger
                    className="h-9 border border-transparent bg-muted/50 px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:bg-background dark:data-[state=active]:bg-primary"
                    key={status}
                    value={status.toLowerCase()}
                  >
                    {status}
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </CardHeader>

          {children}
        </Tabs>
      </Card>
    </div>
  );
};

export default RecentOrdersLayout;
