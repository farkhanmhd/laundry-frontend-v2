"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
import { authClient } from "@/lib/modules/auth/auth-client";
import { toastResponse } from "@/lib/toast-helper";

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(7, "onboarding.phoneNumber.min")
    .max(15, "onboarding.phoneNumber.max")
    .regex(/^[1-9][0-9]*$/, "onboarding.phoneNumber.regex"),
});

const createMemberSchema = z.object({
  name: z.string().min(2, "onboarding.name.min"),
});

type PhoneValues = z.infer<typeof phoneSchema>;
type CreateMemberValues = z.infer<typeof createMemberSchema>;

type OnboardingStep = "PHONE" | "ACTION";

interface ExistingMember {
  memberId: string;
  name: string;
  phoneNumber: string;
}

export default function OnboardingPage() {
  const t = useTranslations("Onboarding");
  const tValidation = useTranslations("Validation");
  const tNotifications = useTranslations("Notifications");
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [step, setStep] = useState<OnboardingStep>("PHONE");
  const [isSearching, setIsSearching] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [existingMember, setExistingMember] = useState<ExistingMember | null>(
    null
  );
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneForm = useForm<PhoneValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const createForm = useForm<CreateMemberValues>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: "",
    },
  });

  // Pre-fill name from session when it becomes available
  useEffect(() => {
    if (session?.user.name && !createForm.getValues("name")) {
      createForm.setValue("name", session.user.name);
    }
  }, [session, createForm]);

  const onPhoneSubmit = async (values: PhoneValues) => {
    setIsSearching(true);
    try {
      const { data, error } = await elysia.members["search-by-phone"].get({
        query: { phone: values.phoneNumber },
      });

      setPhoneNumber(values.phoneNumber);

      if (error) {
        if (error.status === 404) {
          setExistingMember(null);
        } else {
          toast.error(toastResponse(tNotifications, error.value || {}));
          setIsSearching(false);
          return;
        }
      } else if (data?.data) {
        setExistingMember(data.data as ExistingMember);
      } else {
        setExistingMember(null);
      }

      setStep("ACTION");
    } catch (err) {
      toast.error(
        toastResponse(
          tNotifications,
          (err as { messageKey?: string; message?: string }) || {}
        )
      );
    } finally {
      setIsSearching(false);
    }
  };

  const onConnectMember = async () => {
    if (!existingMember) {
      return;
    }

    setIsConnecting(true);
    try {
      const { data, error } = await elysia.users["connect-member"].post(
        {
          memberId: existingMember.memberId,
          phoneNumber,
        },
        {
          fetch: { credentials: "include" },
        }
      );

      if (error) {
        toast.error(toastResponse(tNotifications, error.value || {}));
        setIsConnecting(false);
        return;
      }

      toast.success(toastResponse(tNotifications, data || {}));
      router.push("/dashboard");
    } catch (err) {
      toast.error(
        toastResponse(
          tNotifications,
          (err as { messageKey?: string; message?: string }) || {}
        )
      );
      setIsConnecting(false);
    }
  };

  const onCreateMember = async (values: CreateMemberValues) => {
    try {
      const { data, error } = await elysia.users["create-member"].post(
        {
          name: values.name,
          phoneNumber,
        },
        {
          fetch: { credentials: "include" },
        }
      );

      if (error) {
        toast.error(toastResponse(tNotifications, error.value || {}));
        return;
      }

      toast.success(toastResponse(tNotifications, data || {}));
      router.push("/dashboard");
    } catch (err) {
      toast.error(
        toastResponse(
          tNotifications,
          (err as { messageKey?: string; message?: string }) || {}
        )
      );
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none md:border-solid md:shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription className="text-base">{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        {step === "PHONE" && (
          <form
            className="space-y-6"
            onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
          >
            <div className="group relative">
              <FormInput
                className="h-12 pl-10 text-lg"
                disabled={isSearching}
                form={phoneForm}
                inputMode="numeric"
                label={t("phoneNumber")}
                placeholder={t("phoneNumberPlaceholder")}
                tValidation={tValidation}
                type="text"
                {...phoneForm.register("phoneNumber", {
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
              disabled={isSearching}
              type="submit"
            >
              {isSearching ? t("lookup.searching") : t("submit")}
            </Button>
          </form>
        )}

        {step === "ACTION" && (
          <div className="space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium text-sm">
                {t("phoneNumber")}: +62{phoneNumber}
              </p>
              <Button
                className="mt-2 h-auto p-0 text-primary text-xs"
                disabled={isConnecting || createForm.formState.isSubmitting}
                onClick={() => setStep("PHONE")}
                variant="link"
              >
                {t("lookup.changePhone")}
              </Button>
            </div>

            {existingMember ? (
              <div className="space-y-4">
                <p className="text-center text-muted-foreground text-sm">
                  {t("lookup.memberFound")}
                </p>
                <div className="rounded-lg border p-4">
                  <p className="font-bold">{existingMember.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {existingMember.phoneNumber}
                  </p>
                </div>
                <Button
                  className="h-12 w-full font-semibold text-lg"
                  disabled={isConnecting}
                  onClick={onConnectMember}
                >
                  {isConnecting ? t("submitting") : t("lookup.connect")}
                </Button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={createForm.handleSubmit(onCreateMember)}
              >
                <p className="text-center text-muted-foreground text-sm">
                  {t("lookup.memberNotFound")}
                </p>
                <FormInput
                  className="h-12 text-lg"
                  disabled={createForm.formState.isSubmitting}
                  form={createForm}
                  label={t("lookup.name")}
                  placeholder={t("lookup.namePlaceholder")}
                  tValidation={tValidation}
                  type="text"
                  {...createForm.register("name")}
                />
                <Button
                  className="h-12 w-full font-semibold text-lg"
                  disabled={createForm.formState.isSubmitting}
                  type="submit"
                >
                  {createForm.formState.isSubmitting
                    ? t("submitting")
                    : t("lookup.create")}
                </Button>
              </form>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
