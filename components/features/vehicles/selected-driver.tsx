import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  name: string;
  onClick: () => void;
}

export const SelectedDriver = ({ name, onClick }: Props) => {
  const t = useTranslations("Vehicles");

  return (
    <div className="fade-in slide-in-from-top-2 flex animate-in items-start justify-between gap-3 rounded-lg border border-primary p-4 duration-300">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-sm">
          {name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-card-foreground text-sm">{name}</p>
        </div>
      </div>
      <button
        aria-label={t("form.clearDriver")}
        className="ml-2 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-card-foreground"
        onClick={onClick}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
