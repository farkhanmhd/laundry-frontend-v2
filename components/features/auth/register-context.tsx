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
import { elysia } from "@/elysia";
import { type RegisterSchema, registerSchema } from "./schema";

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

const registerUser = async (body: Omit<RegisterSchema, "confirmPassword">) => {
  const { data, error } = await elysia.users.post(body);

  if (error || !data) {
    return null;
  }

  return data.data;
};

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
      const { confirmPassword, ...payload } = data;
      const result = await registerUser(payload);

      if (!result) {
        toast.error("Registration failed", { description: "Server Error" });
        return;
      }

      if (result.newUserId) {
        toast.success("Account created!", {
          description: "Welcome aboard. Please sign in.",
        });
        push("/login");
      }
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
