"use client";

import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import { authClient } from "@/lib/modules/auth/auth-client";
import { usePosOrderItem } from "@/lib/modules/pos/state";
import { cn } from "@/lib/utils";
import { useCustomerOrder } from "../features/orders/state";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { Client } from "../utils/client";
import { BreadcrumbNav } from "./breadcrumb-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { posItem, toggleCart, totalItems } = usePosOrderItem();
  const { totalItems: customerTotalItems } = useCustomerOrder();
  const { data: session } = authClient.useSession();
  const isLarge = useBreakpoint(1024);

  return (
    <header className="b flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <BreadcrumbNav />
      </div>
      <Client>
        <div className="flex items-center gap-2">
          {session?.user.role !== "user" && !isLarge && (
            <Button
              className="relative w-9"
              onClick={toggleCart}
              variant="ghost"
            >
              <ShoppingCart />
              {posItem.items.length > 0 && (
                <Badge className="absolute top-0.5 right-[-0.5px] h-4 w-4 rounded-full p-0 text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </Button>
          )}
          {session?.user.role === "user" ? (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "relative w-9"
              )}
              href="/customer-orders/new/order-summary"
            >
              <ShoppingCart />
              {customerTotalItems > 0 && (
                <Badge className="absolute top-0.5 right-[-0.5px] h-4 w-4 rounded-full p-0 text-[10px]">
                  {customerTotalItems}
                </Badge>
              )}
            </Link>
          ) : (
            <Link
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              href="/account"
            >
              <User />
            </Link>
          )}
          <ThemeToggle />
        </div>
      </Client>
    </header>
  );
}
