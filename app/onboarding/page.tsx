"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { elysia } from "@/elysia";

const onboardingSchema = z.object({
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .max(15, "Phone number must be at most 15 characters")
    .regex(
      /^[1-9][0-9]*$/,
      "Phone number must not start with 0 and contain only numbers"
    ),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const t = useTranslations("Onboarding");
  const router = useRouter();

  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: OnboardingValues) => {
    try {
      const { error } = await elysia.account.phone.post(values, {
        fetch: {
          credentials: "include",
        },
      });

      if (error) {
        toast.error(error.value.message);
        return;
      }

      toast.success(t("success"));
      router.push("/dashboard");
    } catch (err) {
      toast.error(`${t("error")}. ${err instanceof Error ? err.message : ""}`);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none md:border-solid md:shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription className="text-base">{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="group relative">
            <FormInput
              className="h-12 pl-10 text-lg"
              disabled={form.formState.isSubmitting}
              form={form}
              inputMode="numeric"
              label={t("phoneNumber")}
              placeholder={t("phoneNumberPlaceholder")}
              type="text"
              {...form.register("phoneNumber", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                },
              })}
            />
            <span className="absolute top-9 left-3 z-10 flex h-12 items-center text-muted-foreground text-sm">
              +62
            </span>
          </div>
          <Button
            className="h-12 w-full font-semibold text-lg"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
