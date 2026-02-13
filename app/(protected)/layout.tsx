import { MobilePosOrder } from "@/components/features/pos/mobile-pos-order";
import { MobileNav } from "@/components/navigation/mobile-nav";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider open={false}>
      <AppSidebar>
        <NavigationSidebar />
      </AppSidebar>
      <SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0.5 md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none">
        <SiteHeader />
        <SidebarContent className="relative overflow-hidden">
          <ScrollArea className="max-h-[calc(100dvh-128px)] max-w-svw md:max-h-[calc(100dvh-64px)] md:max-w-[calc(100svw-80px)] [&>div>div]:h-full">
            {children}
          </ScrollArea>
        </SidebarContent>
        <MobilePosOrder />
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
