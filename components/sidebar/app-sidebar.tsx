"use client";

import { Triangle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Navigation");

  return (
    <Sidebar
      className="z-50 overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      collapsible="icon"
      {...props}
    >
      <Sidebar collapsible="none" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex aspect-square size-8 w-full items-center rounded-lg md:flex md:aspect-square md:flex-col md:items-center md:justify-center md:p-2 md:text-muted-foreground md:group-data-[collapsible=icon]:size-full! [&>svg]:size-6 md:[&>svg]:size-5"
                size="lg"
              >
                <Link href="#">
                  <Triangle />
                  <span className="md:hidden">{t("appTitle")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <ScrollArea className="h-full max-h-[calc(100dvh-112px)] md:max-h-[calc(100dvh-160px)] [&>div>div]:h-full">
          {children}
        </ScrollArea>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SignoutDialog />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
