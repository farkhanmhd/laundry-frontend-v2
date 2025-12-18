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
            Welcome to Beringin Coin Laundry.
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
          Sign In
        </Button>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
