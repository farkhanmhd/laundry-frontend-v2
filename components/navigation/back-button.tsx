"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export const Back = () => {
  const t = useTranslations("Navigation");
  const { back } = useRouter();
  return (
    <Button onClick={back} size="sm" variant="ghost">
      <ChevronLeft />
      <span>{t("back")}</span>
    </Button>
  );
};
