import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

type DeliveryStatus =
  | "requested"
  | "in_progress"
  | "picked_up"
  | "completed"
  | "cancelled";

const statusVariant: Record<
  DeliveryStatus,
  "secondary" | "default" | "info" | "success" | "destructive"
> = {
  requested: "secondary",
  in_progress: "default",
  picked_up: "info",
  completed: "success",
  cancelled: "destructive",
};

export function StatusBadge({ status }: { status: DeliveryStatus }) {
  const t = useTranslations("driverDashboard.status");
  return <Badge variant={statusVariant[status]}>{t(status)}</Badge>;
}
