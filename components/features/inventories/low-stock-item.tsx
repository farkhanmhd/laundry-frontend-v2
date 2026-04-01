import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Props = {
  item: {
    id: string;
    name: string;
    current: number;
    safety: number;
  };
};

export const LowStockItem = ({ item }: Props) => {
  return (
    <Link
      className="block rounded-lg border border-border p-3 transition-all hover:border-primary hover:bg-muted/50"
      href={`/inventories/${item.id}`}
      key={item.id}
    >
      <div className="mb-2 flex items-start justify-between">
        <p className="font-medium text-sm">{item.name}</p>
        <Badge variant="destructive">Alert</Badge>
      </div>
      <div className="flex justify-between text-muted-foreground text-xs">
        <span>Current: {item.current}</span>
        <span>Safety Stock: {item.safety}</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full border bg-muted">
        <div
          className="h-2 rounded-full bg-destructive"
          style={{
            width: `${(item.current / item.safety) * 100}%`,
          }}
        />
      </div>
    </Link>
  );
};
