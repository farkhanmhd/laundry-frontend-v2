import { Suspense } from "react";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { SidebarSkeleton } from "@/components/navigation/sidebar-skeleton";
import { SiteHeader } from "@/components/navigation/site-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function EmployeeLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar>
        <Suspense fallback={<SidebarSkeleton />}>{sidebar}</Suspense>
      </AppSidebar>
      <SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0.5 md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none">
        <SiteHeader />
        <SidebarContent>
          <ScrollArea className="h-full max-h-[calc(100dvh-128px)] md:max-h-[calc(100dvh-64px)] [&>div>div]:h-full">
            {children}
          </ScrollArea>
        </SidebarContent>
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
