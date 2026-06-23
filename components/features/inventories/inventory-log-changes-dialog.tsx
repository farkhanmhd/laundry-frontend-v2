import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToIDR } from "@/lib/utils";

const displayValue = (value: unknown): string => {
  if (value === null || value === undefined) return "-";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return formatToIDR(value);
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

interface Props {
  changedFields: unknown;
}

export function InventoryLogChangesDialog({ changedFields }: Props) {
  const t = useTranslations("Inventories");

  if (!changedFields || typeof changedFields !== "object") {
    return null;
  }

  const entries = Object.entries(
    changedFields as Record<string, { new: unknown; old: unknown }>
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("logs.changedFieldsTitle")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.name")}</TableHead>
                <TableHead>{t("logs.previous")}</TableHead>
                <TableHead>{t("logs.change")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(([field, values]) => (
                <TableRow key={field}>
                  <TableCell className="font-medium capitalize">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {displayValue(values?.old)}
                  </TableCell>
                  <TableCell>{displayValue(values?.new)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
