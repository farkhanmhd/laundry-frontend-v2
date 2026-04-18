"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cardShadowStyle } from "@/lib/utils";

interface ExportButtonProps extends React.ComponentProps<typeof Button> {
  href: string;
  label?: string;
  successMessage?: string;
}

export function ExportButton({
  href,
  label = "Export",
  successMessage = "Report download started",
  ...props
}: ExportButtonProps) {
  return (
    <Button asChild style={cardShadowStyle} variant="outline" {...props}>
      <a
        download
        href={href}
        onClick={() => toast.success(successMessage)}
        rel="noopener noreferrer"
      >
        <Download />
        {label}
      </a>
    </Button>
  );
}
