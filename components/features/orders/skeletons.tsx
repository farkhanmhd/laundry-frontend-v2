import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle } from "@/lib/utils";

export const OrderInfoSkeleton = () => {
  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </CardTitle>
        <Skeleton className="h-8 w-24" /> {/* Button */}
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="grid gap-6 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div className="flex flex-col gap-2" key={i}>
            <Skeleton className="h-3 w-16" /> {/* Label */}
            <Skeleton className="h-5 w-24" /> {/* Value */}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const OrderDeliverySkeleton = () => {
  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </CardTitle>
        <Skeleton className="h-5 w-16" /> {/* Badge */}
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="grid gap-6">
        {[1, 2].map((i) => (
          <div className="relative" key={i}>
            {/* Simulate Separator for 2nd item */}
            {i > 1 && <Separator className="absolute -top-3 mb-6" />}

            {/* Header Row */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-20" /> {/* Status Badge */}
            </div>

            {/* Content Rows */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-24" /> {/* Label */}
                <Skeleton className="h-4 w-32" /> {/* Value */}
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const OrderPaymentSkeleton = () => {
  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-36" />
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="grid gap-6 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div className="flex flex-col gap-1" key={i}>
            <Skeleton className="h-3 w-24" /> {/* Label */}
            <Skeleton className="h-4 w-28" /> {/* Value */}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const OrderCustomerSkeleton = () => {
  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-5 w-16" /> {/* Member Badge */}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export const OrderItemsSkeleton = () => {
  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <Skeleton className="h-4 w-64" /> {/* Description */}
      </CardHeader>

      <CardContent className="p-0">
        {/* Table Header Simulation */}
        <div className="flex items-center justify-between bg-muted/50 px-6 py-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Table Rows */}
        <div className="flex flex-col">
          {[1, 2, 3].map((i) => (
            <div
              className="flex items-start justify-between border-b px-6 py-4 last:border-0"
              key={i}
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" /> {/* Item Name */}
                <Skeleton className="h-3 w-24" /> {/* Note or details */}
              </div>
              <div className="flex gap-8">
                <Skeleton className="h-6 w-16" /> {/* Badge */}
                <Skeleton className="h-5 w-20" /> {/* Price */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Footer Summary */}
      <div className="border-t bg-muted/20 px-6 py-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-12" /> {/* Total Label */}
            <Skeleton className="h-8 w-32" /> {/* Total Value */}
          </div>
        </div>
      </div>
    </Card>
  );
};
