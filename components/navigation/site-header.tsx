"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  // const [theme, setTheme] = useState<"light" | "dark">(() => {
  //   if (typeof window !== "undefined") {
  //     const savedTheme = localStorage.getItem("theme");
  //     return savedTheme === "dark" ? "dark" : "light";
  //   }
  //   return "light";
  // });

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);

  //   if (theme === "light") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // };

  // console.log(theme);
  // const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-muted-foreground border-b px-4 dark:border-muted">
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
        <h2 className="font-medium">Page Title</h2>
      </div>
      <ThemeToggle />
    </header>
  );
}
