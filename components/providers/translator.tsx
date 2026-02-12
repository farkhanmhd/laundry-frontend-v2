import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languageAtom = atomWithStorage<"en" | "id">("language", "en");

export const useTranslation = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  return { language, setLanguage }
}

interface TranslateProps {
  en: string,
  id: string,
}

export function Translator({ en, id}: TranslateProps) {
  const { language } = useTranslation();

  return language === "en" ? en : id;
}

export function TranslatorToggle() {
  const { setLanguage } = useTranslation();

  const handleLanguageChange = (language: "en" | "id") => {
    setLanguage(language);
    document.documentElement.lang = language;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("id")}>
          Bahasa Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
