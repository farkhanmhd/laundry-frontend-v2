"use client";

import { Command } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignoutDialog } from "../features/auth/signout-dialog";
import { ScrollArea } from "../ui/scroll-area";

type Props = React.ComponentPropsWithoutRef<typeof Sidebar>;

export function AppSidebar({ children, ...props }: Props) {
  return (
    <Sidebar
      className="border-muted-foreground/60 border-r dark:border-muted"
      collapsible="icon"
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Laundry App</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <ScrollArea className="h-full [&>div>div]:h-full">{children}</ScrollArea>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SignoutDialog />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
