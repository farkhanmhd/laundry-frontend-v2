"use client";

import { Bell, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { usePosProducts } from "@/hooks/state";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import { superAdminNavData } from "@/lib/constants";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Back } from "./back-button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const { posProduct, toggleCart, totalItems } = usePosProducts();
  const isLarge = useBreakpoint(1024);
  const splittedPathname = pathname.split("/");
  const title = superAdminNavData.find(
    (item) => item.url.split("/")[1] === splittedPathname[1]
  )?.title;

  return (
    <header className="b flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        {splittedPathname.length >= 3 ? (
          <Back />
        ) : (
          <h1 className="font-medium">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            toast.error("Not implemented yet");
          }}
          size="icon"
          variant="ghost"
        >
          <Bell />
        </Button>
        {!isLarge && (
          <Button className="relative w-9" onClick={toggleCart} variant="ghost">
            <ShoppingCart />
            {posProduct.items.length > 0 && (
              <Badge className="absolute top-0.5 right-[-0.5px] h-4 w-4 rounded-full p-0 text-[10px]">
                {totalItems}
              </Badge>
            )}
          </Button>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}
