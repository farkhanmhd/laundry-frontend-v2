"use client";

import { MoonStar, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserRole } from "@/hooks/use-user-role";
import { adminNavData, superAdminNavData } from "@/lib/constants";
import { MapItems } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export function NavigationCommand({
  className = "",
  children,
  size,
  variant,
}: Props) {
  const { push } = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);
  const { setTheme } = useTheme();
  const role = useUserRole();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (role === "user") {
    return null;
  }

  const menu = role === "superadmin" ? superAdminNavData : adminNavData;

  return (
    <>
      <Button
        className={className}
        onClick={() => setCommandOpen(true)}
        size={size}
        variant={variant}
      >
        {children}
      </Button>
      <CommandDialog
        className="rounded-lg border shadow-md md:min-w-112.5"
        onOpenChange={setCommandOpen}
        open={commandOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <ScrollArea className="h-75">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Menu">
              <MapItems
                of={menu}
                render={(item, index) => (
                  <CommandItem
                    key={`item-${item.url}-${index}`}
                    onSelect={() => {
                      push(item.url);
                      setCommandOpen(false);
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </CommandItem>
                )}
              />
            </CommandGroup>
            <CommandGroup heading="Settings">
              <CommandItem
                onSelect={() => {
                  setTheme("dark");
                  setCommandOpen(false);
                }}
              >
                <MoonStar />
                <span>Set Dark Mode</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setTheme("light");
                  setCommandOpen(false);
                }}
              >
                <Sun />
                <span>Set Light Mode</span>
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    </>
  );
}
