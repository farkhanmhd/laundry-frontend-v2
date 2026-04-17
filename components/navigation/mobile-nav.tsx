"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserRole } from "@/hooks/use-user-role";
import {
  adminMobileNavData,
  customerMobileNavData,
  superAdminMobileNavData,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export function MobileNav() {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const role = useUserRole();
  const pathname = usePathname();

  const navData = {
    admin: adminMobileNavData,
    superadmin: superAdminMobileNavData,
    user: customerMobileNavData,
  };

  const selectedNavData = navData[role as keyof typeof navData] || [];

  if (isMobile) {
    return (
      <footer className="h-16 border-t md:hidden">
        <nav className="size-full">
          <ul className="flex size-full text-muted-foreground [&>li>*]:size-full [&>li>*]:rounded-none [&>li]:flex [&>li]:flex-1 [&>li]:items-center [&>li]:justify-center">
            {selectedNavData.map((item) => {
              const isActive =
                pathname.split("/")[1] === item.url.split("/")[1];
              return (
                <li key={item.title}>
                  <Link
                    className={cn(buttonVariants({ variant: "ghost" }), {
                      "text-primary": isActive,
                    })}
                    href={item.url}
                  >
                    <item.icon className="size-6" />
                  </Link>
                </li>
              );
            })}
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

  return null;
}
