import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  searchInput: string;
  onClick: () => void;
}

export const PosEmptySearch = ({ searchInput, onClick }: Props) => {
  const t = useTranslations("POS.customerSearch.emptySearch");

  if (searchInput.length > 0) {
    return (
      <div className="fade-in slide-in-from-top-2 animate-in space-y-2 duration-300">
        <Alert>
          <AlertTitle>{t("noMemberFound")}</AlertTitle>
          <AlertDescription>
            {t("confirmAdd", { phone: searchInput })}
          </AlertDescription>
        </Alert>
        <Button
          className="w-full border-primary bg-transparent text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          onClick={onClick}
          variant="outline"
        >
          {t("addAsNewMember")}
        </Button>
      </div>
    );
  }

  return null;
};
