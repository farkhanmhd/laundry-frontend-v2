"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Triangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type LoginSchema,
  loginSchema,
} from "@/components/features/auth/schema";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { authClient } from "@/lib/modules/auth/auth-client";
import { cn } from "@/lib/utils";
import { Translator } from "@/components/providers/translator";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { push } = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const { data: session, error } = await authClient.signIn.username(data);

      if (error) {
        toast.error(error.statusText, {
          description: error.message,
        });
      } else {
        toast.success(`Welcome back, ${session.user.name}!`);
        push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          "Oops! Something went wrong on our end. Please try again in a moment."
        );
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Triangle className="size-6" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </div>
          <h1 className="font-bold text-xl">
            <Translator
            en="Welcome to Beringin Coin Laundry."
            id="Selamat datang di Laundry Beringin Coin."
            />
          </h1>
        </div>
        <FormInput
          disabled={form.formState.isSubmitting}
          form={form}
          label="Username"
          name="username"
          placeholder="Username"
        />
        <FormInput
          disabled={form.formState.isSubmitting}
          form={form}
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          <Translator en="Sign In" id="Masuk" />
        </Button>
      </form>
      <FieldDescription className="px-6 text-center">
        <Translator
          en="By clicking continue, you agree to our Terms of Service and Privacy Policy."
          id="Dengan mengklik lanjut, Anda setuju dengan Kebijakan Privasi dan Syarat dan Ketentuan kami."
        />
        <Link href="#">
          <Translator en=" Terms of Service" id=" Syarat & Ketentuan" />
        </Link>
        <span>
          <Translator en=" and " id=" dan "  />
        </span>
        <Link href="#">
          <Translator en="Privacy Policy" id="Kebijakan Privasi" />
        </Link>.
      </FieldDescription>
    </div>
  );
}
