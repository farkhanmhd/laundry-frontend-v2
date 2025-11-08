"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { superAdminNavData } from "@/lib/constants";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Back } from "./back-button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const title = superAdminNavData.find(
    (item) => item.url.split("/")[1] === splittedPathname[1]
  )?.title;

  return (
    <header className="b flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        {!isMobile && (
          <div className="hidden items-center gap-2 md:flex">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
          </div>
        )}
        {splittedPathname.length >= 3 ? (
          <Back />
        ) : (
          <h1 className="font-medium text-base">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            toast.error("Not implemented yet");
          }}
          size="icon"
          variant="ghost"
        >
          <Bell />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
