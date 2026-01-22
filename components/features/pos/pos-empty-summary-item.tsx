import { Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function PosEmptySummaryItem() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>No items added</EmptyTitle>
        <EmptyDescription>Your cart is currently empty.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link className={buttonVariants({ variant: "secondary" })} href="/pos">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Link>
      </EmptyContent>
    </Empty>
  );
}
