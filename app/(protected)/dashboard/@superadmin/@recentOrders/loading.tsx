import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import { MapItems } from "@/lib/utils";

const RecentOrdersLoading = () => {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <CardContent className="flex-1">
      {["all", "pending", "processing", "ready", "completed"].map((tab) => (
        <TabsContent className="mt-0 space-y-2" key={tab} value={tab}>
          <div className="space-y-2">
            <MapItems
              of={skeletonItems}
              render={(_, i) => (
                <div key={i}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-secondary p-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              )}
            />
          </div>
        </TabsContent>
      ))}
    </CardContent>
  );
};

export default RecentOrdersLoading;
