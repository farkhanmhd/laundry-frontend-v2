// components/features/receipt/receipt-search.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2, Receipt, SearchX } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ReceiptLookupResult {
  orderId: string;
  exists: boolean;
  customerName?: string;
  createdAt?: string;
  status?: string;
}

// ---------------------------------------------------------------------------
// Mock API — replace with your real fetch when ready
// ---------------------------------------------------------------------------
async function lookupReceipt(orderId: string): Promise<ReceiptLookupResult> {
  await new Promise((r) => setTimeout(r, 800));

  // TODO: replace with real call:
  // const res = await fetch(`/api/receipt/lookup?orderId=${encodeURIComponent(orderId)}`);
  // if (!res.ok) throw new Error("Failed to look up receipt");
  // return res.json();

  // Mock: IDs ending in "0" do not exist
  if (orderId.trim().endsWith("0")) {
    return { orderId, exists: false };
  }

  return {
    orderId,
    exists: true,
    customerName: "Ade Ade Santoso",
    createdAt: "2026-02-24 16:08:35.224+07",
    status: "processing",
  };
}

// ---------------------------------------------------------------------------
// Result card — found
// ---------------------------------------------------------------------------
function FoundResult({ data }: { data: ReceiptLookupResult }) {
  const formattedDate = data.createdAt
    ? new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(data.createdAt))
    : null;

  return (
    <Link
      className="group flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-primary/10"
      href={`/receipt/${data.orderId}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
          <Receipt className="size-4 text-primary" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate font-medium text-[13.5px] text-foreground">
            {data.customerName ?? data.orderId}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">
              {data.orderId}
            </span>
            {formattedDate && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-[11px] text-muted-foreground">
                  {formattedDate}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Result card — not found
// ---------------------------------------------------------------------------
function NotFoundResult({
  orderId,
  t,
}: {
  orderId: string;
  t: ReturnType<typeof useTranslations<"ReceiptSearch">>;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
        <SearchX className="size-4 text-destructive" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="font-medium text-[13px] text-destructive">
          {t("notFoundTitle")}
        </p>
        <p className="text-[11.5px] text-muted-foreground">
          {t("notFoundDescription", { orderId })}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Receipt Search
// ---------------------------------------------------------------------------
export function ReceiptSearch() {
  const t = useTranslations("ReceiptSearch");
  const [inputValue, setInputValue] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const isValid = inputValue.trim().length >= 7;
  const isDirty = submittedId !== "" && inputValue.trim() !== submittedId;

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ["receipt-lookup", submittedId],
    queryFn: () => lookupReceipt(submittedId),
    enabled: submittedId.length >= 7,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    setSubmittedId(inputValue.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Show result only when query matches current input (not stale from previous search)
  const showResult = isSuccess && !isDirty;
  const showError = isError && !isDirty;

  return (
    <div className="flex w-full flex-col gap-7">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Receipt className="size-5 text-primary" />
        </div>
        <h1 className="font-semibold text-[22px] text-foreground tracking-tight">
          {t("title")}
        </h1>
        <p className="text-[13.5px] text-muted-foreground leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60" />

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <Label
            className="font-medium text-[13px] text-foreground"
            htmlFor="orderId"
          >
            {t("orderId")}
          </Label>
          <Input
            autoComplete="off"
            autoFocus
            className={cn(
              showResult &&
                data?.exists &&
                "border-primary/50 focus-visible:ring-primary/30",
              showResult &&
                !data?.exists &&
                "border-destructive/70 focus-visible:ring-destructive/40"
            )}
            disabled={isFetching}
            id="orderId"
            onChange={handleInputChange}
            placeholder={t("orderIdPlaceholder")}
            value={inputValue}
          />
          {!isValid && inputValue.length > 0 && (
            <p className="text-[11.5px] text-muted-foreground">
              {t("validationMinLength")}
            </p>
          )}
        </div>

        <Button
          className="w-full rounded-lg font-medium tracking-tight transition-all active:scale-[0.98]"
          disabled={!isValid || isFetching}
          size="default"
          type="submit"
        >
          {isFetching ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              {t("lookingUp")}
            </span>
          ) : (
            <span className="flex items-center gap-2">{t("findReceipt")}</span>
          )}
        </Button>
      </form>

      {/* Result area */}
      {showResult &&
        (data?.exists ? (
          <FoundResult data={data} />
        ) : (
          <NotFoundResult orderId={submittedId} t={t} />
        ))}

      {/* Fetch error */}
      {showError && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
          <p className="text-[13px] text-destructive">
            {error instanceof Error ? error.message : t("errorMessage")}
          </p>
        </div>
      )}
    </div>
  );
}
