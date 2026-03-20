// components/features/auth/register-form.tsx
"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  type ExistingMember,
  type PhoneStatus,
  RegisterProvider,
  useRegister,
} from "./register-context";

// ---------------------------------------------------------------------------
// Phone status badge
// ---------------------------------------------------------------------------
function PhoneStatusBadge({ status }: { status: PhoneStatus }) {
  const { t } = useRegister();

  if (status === "idle") {
    return null;
  }

  const config = {
    checking: {
      icon: <Loader2 className="size-3 animate-spin" />,
      label: t("phoneChecking"),
      className: "text-muted-foreground",
    },
    available: {
      icon: <Check className="size-3" />,
      label: t("phoneAvailable"),
      className: "text-emerald-500",
    },
    taken: {
      icon: <Check className="size-3" />,
      label: t("phoneTaken"),
      className: "text-primary",
    },
    error: {
      icon: <AlertCircle className="size-3" />,
      label: t("phoneError"),
      className: "text-amber-500",
    },
  } as const;

  const c = config[status];

  return (
    <span
      className={cn(
        "flex items-center gap-1 font-medium text-[11.5px]",
        c.className
      )}
    >
      {c.icon}
      {c.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Existing member banner
// ---------------------------------------------------------------------------
function MemberBanner({ member }: { member: ExistingMember }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3.5 py-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
        <Check className="size-4 text-primary" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="font-medium text-[12.5px] text-primary">
          Existing member found
        </p>
        <p className="truncate text-[11.5px] text-muted-foreground">
          {member.name} · ID {member.memberId}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Phone field
// ---------------------------------------------------------------------------
function PhoneField() {
  const { form, phoneStatus, isSubmitting, handlePhoneChange, t } =
    useRegister();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label
          className="font-medium text-[13px] text-foreground"
          htmlFor="phoneNumber"
        >
          {t("phoneNumber")}
        </Label>
        <PhoneStatusBadge status={phoneStatus} />
      </div>
      <Input
        disabled={isSubmitting}
        id="phoneNumber"
        placeholder={t("phoneNumberPlaceholder")}
        type="tel"
        {...form.register("phoneNumber")}
        className={cn(
          phoneStatus === "taken" &&
            "border-primary/50 focus-visible:ring-primary/30",
          phoneStatus === "available" &&
            "border-emerald-500/50 focus-visible:ring-emerald-500/30"
        )}
        onChange={handlePhoneChange}
      />
      {form.formState.errors.phoneNumber && (
        <p className="text-[11.5px] text-destructive">
          {form.formState.errors.phoneNumber.message}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Revealed fields (hidden until phone check resolves)
// ---------------------------------------------------------------------------
function RevealedFields() {
  const { form, fieldsVisible, isMember, isSubmitting, existingMember, t } =
    useRegister();

  return (
    <div
      className={cn(
        "flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out",
        fieldsVisible ? "max-h-200 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      {isMember && existingMember && <MemberBanner member={existingMember} />}

      <div className="grid grid-cols-2 gap-3">
        <FormInput
          disabled={isSubmitting || isMember}
          form={form}
          label={t("fullName")}
          name="name"
          placeholder={t("fullNamePlaceholder")}
        />
        <FormInput
          disabled={isSubmitting}
          form={form}
          label={t("username")}
          name="username"
          placeholder={t("usernamePlaceholder")}
        />
      </div>

      <FormInput
        disabled={isSubmitting}
        form={form}
        label={t("email")}
        name="email"
        placeholder={t("emailPlaceholder")}
        type="email"
      />

      <div className="grid grid-cols-2 gap-3">
        <FormInput
          disabled={isSubmitting}
          form={form}
          label={t("password")}
          name="password"
          placeholder={t("passwordPlaceholder")}
          type="password"
        />
        <FormInput
          disabled={isSubmitting}
          form={form}
          label={t("confirmPassword")}
          name="confirmPassword"
          placeholder={t("confirmPasswordPlaceholder")}
          type="password"
        />
      </div>

      <Button
        className="mt-1 w-full rounded-lg font-medium tracking-tight transition-all active:scale-[0.98]"
        disabled={isSubmitting}
        size="default"
        type="submit"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            {t("creatingAccount")}
          </span>
        ) : (
          t("createAccount")
        )}
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner form — consumes context
// ---------------------------------------------------------------------------
function RegisterFormInner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit, t } = useRegister();

  return (
    <div className={cn("flex w-full flex-col gap-7", className)} {...props}>
      <div className="flex flex-col gap-1.5">
        <h1 className="font-semibold text-[22px] text-foreground tracking-tight">
          {t("greeting")}
        </h1>
        <p className="text-[13.5px] text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="h-px bg-border/60" />

      <form
        className="flex w-full flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <PhoneField />
          <RevealedFields />
        </div>
      </form>

      <p className="text-center text-[12.5px] text-muted-foreground/70">
        {t("alreadyHaveAccount")}{" "}
        <Link
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          href="/login"
        >
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public export — wraps inner form with provider
// ---------------------------------------------------------------------------
export function RegisterForm(props: React.ComponentProps<"div">) {
  return (
    <RegisterProvider>
      <RegisterFormInner {...props} />
    </RegisterProvider>
  );
}
