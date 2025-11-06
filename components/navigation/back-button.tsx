"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Back = () => {
  const { back } = useRouter();
  return (
    <Button onClick={back} size="sm" variant="ghost">
      <ChevronLeft />
      <span>Back</span>
    </Button>
  );
};
