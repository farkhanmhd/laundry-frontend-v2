"use client";

import { CheckIcon, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setUserLocale } from "@/i18n/locale";

const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Bahasa Indonesia",
    value: "id",
  },
];

export function TranslatorToggle() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const handleLanguageChange = (language: string) => {
    document.documentElement.lang = language;
    startTransition(async () => {
      await setUserLocale(language);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending} size="icon" variant="ghost">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {languages.map((language) => (
          <DropdownMenuItem
            className="flex w-full justify-between gap-2"
            key={language.value}
            onClick={() => handleLanguageChange(language.value)}
          >
            <div className="w-full">{language.label}</div>
            {locale === language.value ? (
              <CheckIcon className="h-4 w-4" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
