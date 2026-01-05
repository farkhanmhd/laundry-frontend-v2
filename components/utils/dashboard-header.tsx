"use client";

import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-border border-b bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div>
          <h1 className="font-semibold text-lg">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Settings className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
