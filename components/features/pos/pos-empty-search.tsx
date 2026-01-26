import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  searchInput: string;
  onClick: () => void;
}

export const PosEmptySearch = ({ searchInput, onClick }: Props) => {
  return (
    <div className="fade-in slide-in-from-top-2 animate-in space-y-2 duration-300">
      <Alert>
        <AlertTitle>No member found</AlertTitle>
        <AlertDescription>
          Confirm to add '{searchInput}' as a new member
        </AlertDescription>
      </Alert>
      <Button
        className="w-full border-primary bg-transparent text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
        onClick={onClick}
        variant="outline"
      >
        Add as New Member
      </Button>
    </div>
  );
};
