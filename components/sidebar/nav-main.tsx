"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  adminNavData,
  customerNavData,
  superAdminNavData,
} from "@/lib/constants";
import { SheetClose } from "../ui/sheet";

export function NavMain({ type }: { type: string }) {
  const selectedMenu = {
    superadmin: superAdminNavData,
    admin: adminNavData,
    user: customerNavData,
  };
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="px-1.5 md:px-0">
        <SidebarMenu>
          {(selectedMenu[type as keyof typeof selectedMenu] ?? []).map(
            (item) => {
              const isActive =
                pathname.split("/")[1] === item.url.split("/")[1];

              return (
                <SidebarMenuItem key={item.title}>
                  {isMobile ? (
                    <SheetClose asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SheetClose>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className="flex aspect-square flex-col items-center justify-center p-2 text-muted-foreground group-data-[collapsible=icon]:size-full! [&>svg]:size-5"
                      isActive={isActive}
                      size="lg"
                    >
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        {item.title.length > 8 &&
                        item.title.split(" ").length > 1 ? (
                          <span className="text-[10px]">
                            {item.title.split(" ")[0]}
                            <br />
                            {item.title.split(" ")[1]}{" "}
                          </span>
                        ) : (
                          <span className="text-[10px]">{item.title}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            }
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
