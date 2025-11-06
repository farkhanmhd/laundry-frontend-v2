"use client";

import Link from "next/link";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { adminNavData, superAdminNavData } from "@/lib/constants";
import { SheetClose } from "../ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";

export function NavMain({ type }: { type: string }) {
  const selectedMenu = {
    superadmin: superAdminNavData,
    admin: adminNavData,
  };
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {(selectedMenu[type as keyof typeof selectedMenu] ?? []).map((item) => {
          const isActive = pathname.split("/")[1] === item.url.split("/")[1];

          return (
            <SidebarMenuItem key={item.title}>
              {isMobile ? (
                <SheetClose asChild>
                  <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SheetClose>
              ) : (
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
