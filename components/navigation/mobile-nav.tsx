"use client";

import { Logs, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export function MobileNav() {
  const { toggleSidebar } = useSidebar();
  return (
    <footer className="h-16 border-muted-foreground border-t md:hidden dark:border-muted">
      <nav className="size-full">
        <ul className="flex size-full text-muted-foreground [&>li>*]:size-full [&>li>*]:rounded-none [&>li]:flex [&>li]:flex-1 [&>li]:items-center [&>li]:justify-center">
          <li>
            <Link
              className={cn(buttonVariants({ variant: "ghost" }))}
              href="/pos"
            >
              <Logs className="size-6" />
            </Link>
          </li>
          <li>
            <Button variant="ghost">
              <Search className="size-6" />
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <ShoppingCart className="size-6" />
            </Button>
          </li>
          <li>
            <Button onClick={toggleSidebar} variant="ghost">
              <Menu className="size-6" />
            </Button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
