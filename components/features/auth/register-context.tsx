"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import type { Prettify } from "better-auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createContext, type ReactNode, use, useEffect, useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import { elysia } from "@/elysia";

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

export type PhoneStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "error"
  | "registered";

async function checkPhoneNumber(phone: string) {
  const { data, error } = await elysia.members["search-by-phone"].get({
    query: { phone },
  });

  if (error) {
    return null;
  }

  return data.data;
}

export type ExistingMember = Prettify<
  NonNullable<Awaited<ReturnType<typeof checkPhoneNumber>>>
>;

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

const RegisterContext = createContext<RegisterContextValue | null>(null);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const t = useTranslations("RegisterPage");

  const [phone, setPhone] = useState("");
  const [debouncedPhone] = useDebounce(phone, 300);

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

  const {
    data: existingMember,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["check-phone", debouncedPhone],
    queryFn: () => checkPhoneNumber(debouncedPhone),
    enabled: debouncedPhone.replace(/\D/g, "").length >= 6,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

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
      // If BOTH exist, they are fully registered (The Blocker)
      if (existingMember?.memberId && existingMember.userId) {
        return "registered";
      }
      // If ONLY memberId exists, they are an existing member but need an account (Available)
      if (existingMember?.memberId) {
        return "taken";
      }
      return "available";
    }
    return "idle";
  })();

  const fieldsVisible = phoneStatus === "available" || phoneStatus === "taken";
  const isMember = phoneStatus === "taken" && !!existingMember;

  useEffect(() => {
    form.setValue("name", existingMember?.name ?? "", {
      shouldValidate: !!existingMember,
    });
  }, [existingMember, form]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("phoneNumber", value, { shouldValidate: true });
    setPhone(value);
  };

  const onSubmit = async (data: RegisterSchema) => {
    try {
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

export function useRegister(): RegisterContextValue {
  const ctx = use(RegisterContext);
  if (!ctx) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return ctx;
}
