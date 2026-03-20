"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createContext, type ReactNode, use, useEffect, useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
export const registerSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(32, "Username is too long")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type PhoneStatus = "idle" | "checking" | "available" | "taken" | "error";

export interface ExistingMember {
  memberId: string;
  name: string;
  phoneNumber: string;
}

// ---------------------------------------------------------------------------
// Mock API — replace with your real fetch when ready
// ---------------------------------------------------------------------------
async function checkPhoneNumber(phone: string): Promise<ExistingMember | null> {
  await new Promise((r) => setTimeout(r, 900));

  // TODO: replace with real call:
  // const res = await fetch(`/api/auth/check-phone?phone=${encodeURIComponent(phone)}`);
  // const json = await res.json();
  // return json.exists
  //   ? { memberId: json.memberId, name: json.name, phoneNumber: phone }
  //   : null;

  // Mock: numbers ending in "1" are existing members
  if (phone.replace(/\D/g, "").endsWith("1")) {
    return { memberId: "MBR-0042", name: "Jane Doe", phoneNumber: phone };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------
interface RegisterContextValue {
  form: UseFormReturn<RegisterSchema>;
  phoneStatus: PhoneStatus;
  existingMember: ExistingMember | null | undefined;
  fieldsVisible: boolean;
  isMember: boolean;
  isSubmitting: boolean;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: RegisterSchema) => Promise<void>;
  t: ReturnType<typeof useTranslations<"RegisterPage">>;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const RegisterContext = createContext<RegisterContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function RegisterProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const t = useTranslations("RegisterPage");

  const [debouncedPhone, setDebouncedPhone] = useState("");

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phoneNumber: "",
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // ── Phone check ──────────────────────────────────────────────────────────
  const {
    data: existingMember,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["check-phone", debouncedPhone],
    queryFn: () => checkPhoneNumber(debouncedPhone),
    enabled: debouncedPhone.replace(/\D/g, "").length >= 7,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // ── Derived phone status ─────────────────────────────────────────────────
  const phoneStatus: PhoneStatus = (() => {
    if (!debouncedPhone || debouncedPhone.replace(/\D/g, "").length < 7) {
      return "idle";
    }
    if (isFetching) {
      return "checking";
    }
    if (isError) {
      return "error";
    }
    if (isSuccess) {
      return existingMember ? "taken" : "available";
    }
    return "idle";
  })();

  const fieldsVisible = phoneStatus === "available" || phoneStatus === "taken";
  const isMember = phoneStatus === "taken" && !!existingMember;

  // ── Prefill name when existing member is found ───────────────────────────
  useEffect(() => {
    form.setValue("name", existingMember?.name ?? "", {
      shouldValidate: !!existingMember,
    });
  }, [existingMember, form]);

  // ── Debounced phone change handler ───────────────────────────────────────
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("phoneNumber", value, { shouldValidate: true });

    const timer = setTimeout(() => setDebouncedPhone(value), 600);
    return () => clearTimeout(timer);
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const onSubmit = async (data: RegisterSchema) => {
    try {
      // TODO: wire up auth client
      // await authClient.signUp({ ...data, memberId: existingMember?.memberId });
      console.log(data);
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Account created!", {
        description: "Welcome aboard. Please sign in.",
      });
      push("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Registration failed", { description: error.message });
      }
    }
  };

  return (
    <RegisterContext
      value={{
        form,
        phoneStatus,
        existingMember,
        fieldsVisible,
        isMember,
        isSubmitting,
        handlePhoneChange,
        onSubmit,
        t,
      }}
    >
      {children}
    </RegisterContext>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useRegister(): RegisterContextValue {
  const ctx = use(RegisterContext);
  if (!ctx) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return ctx;
}
