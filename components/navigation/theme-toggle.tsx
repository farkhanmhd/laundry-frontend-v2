import { MoonStar } from "lucide-react";
import { Button } from "../ui/button";

export function ThemeToggle() {
  return (
    <Button size="icon" variant="ghost">
      <MoonStar />
    </Button>
  );
}
