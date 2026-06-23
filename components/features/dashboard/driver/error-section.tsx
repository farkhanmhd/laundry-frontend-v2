import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface ErrorSectionProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorSection({ message, onRetry }: ErrorSectionProps) {
  const t = useTranslations("driverDashboard");
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <p className="text-muted-foreground text-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} size="sm" variant="outline">
          {t("retry")}
        </Button>
      )}
    </div>
  );
}
