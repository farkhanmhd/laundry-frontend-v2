"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useUserRole } from "@/hooks/use-user-role";
import { usePOS } from "@/lib/modules/pos/state";
import { cn } from "@/lib/utils";
import { useCustomerOrder } from "../features/customer-orders/state";
import { TranslatorToggle } from "../providers/translator";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import { Client } from "../utils/client";
import { BreadcrumbNav } from "./breadcrumb-nav";
import { NavigationCommand } from "./navigation-command";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { totalItems } = usePOS();
  const { totalItems: customerTotalItems } = useCustomerOrder();
  const role = useUserRole();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <BreadcrumbNav />
      </div>
      <Client>
        <div className="flex items-center gap-2">
          <NavigationCommand size="icon" variant="ghost">
            <Search />
          </NavigationCommand>
          <ThemeToggle />
          <TranslatorToggle />
          {role === "user" ? (
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
            <>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "relative w-9"
                )}
                href="/pos/summary"
              >
                <ShoppingCart />
                {totalItems > 0 && (
                  <Badge className="absolute top-0.5 right-[-0.5px] h-4 w-4 rounded-full p-0 text-[10px]">
                    {totalItems}
                  </Badge>
                )}
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" })
                )}
                href="/account"
              >
                <User />
              </Link>
            </>
          )}
        </div>
      </Client>
    </header>
  );
}
