import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function PosSummaryAddMoreItem() {
  return (
    <div className="flex items-center justify-between border-t p-4">
      <div className="space-y-1">
        <p className="font-semibold text-sm">Need anything else?</p>
        <p className="text-muted-foreground text-xs">
          Add other items, if you want.
        </p>
      </div>
      <Link
        className={buttonVariants({ variant: "outline", size: "sm" })}
        href="/pos"
      >
        Add More
      </Link>
    </div>
  );
}
