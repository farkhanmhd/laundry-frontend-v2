"use client";

import Link from "next/link";
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminNavData, superAdminNavData } from "@/lib/constants";

export function NavMain({ type }: { type: string }) {
  const selectedMenu = type === "superadmin" ? superAdminNavData : adminNavData;
  return (
    <SidebarGroup>
      <SidebarMenu>
        {selectedMenu.map((item) => (
          <Collapsible asChild key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
