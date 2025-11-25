import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MobilePosOrder } from "@/components/features/pos/mobile-pos-order";
import { MobileNav } from "@/components/navigation/mobile-nav";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { SidebarErrorFallback } from "@/components/navigation/sidebar-error-fallback";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider open={false}>
      <AppSidebar>
        <ErrorBoundary FallbackComponent={SidebarErrorFallback}>
          <Suspense fallback={<SidebarSkeleton />}>
            <NavigationSidebar />
          </Suspense>
        </ErrorBoundary>
      </AppSidebar>
      <SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0.5 md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none">
        <SiteHeader />
        <SidebarContent className="overflow-hidden">
          <ScrollArea className="max-h-[calc(100dvh-128px)] md:max-h-[calc(100dvh-64px)] [&>div>div]:h-full">
            {children}
          </ScrollArea>
        </SidebarContent>
        <MobilePosOrder />
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
