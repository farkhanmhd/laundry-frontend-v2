"use client";

import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  src: string;
  label: string;
};

export function PickupImageDialog({ src, label }: Props) {
  if (!src) return null;

  return (
    <Dialog>
      <DialogTitle className="sr-only">{label}</DialogTitle>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <ImageIcon className="h-3.5 w-3.5" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl sm:max-w-[90vw]">
        {/* biome-ignore lint: pickup proof photo */}
        <img
          alt={label}
          className="w-full rounded-lg object-contain"
          src={src}
        />
      </DialogContent>
    </Dialog>
  );
}
