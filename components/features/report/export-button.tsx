"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
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
  successMessage,
  ...props
}: ExportButtonProps) {
  const t = useTranslations("Notifications");
  const message = successMessage ?? t("report.download.started");

  return (
    <Button asChild style={cardShadowStyle} variant="outline" {...props}>
      <a
        download
        href={href}
        onClick={() => toast.success(message)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Download />
        {label}
      </a>
    </Button>
  );
}
