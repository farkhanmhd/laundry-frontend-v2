import { Skeleton } from "@/components/ui/skeleton";

const ProductDataFormSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-full" />
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-6">
        {/* Product Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-9 w-full" /> {/* Input */}
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>

        {/* Product Price */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-full" />
        </div>

        {/* Reorder Point */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-9 w-full" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
};

export default ProductDataFormSkeleton;
