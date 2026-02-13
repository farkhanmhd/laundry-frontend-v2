import { LoginForm } from "@/components/features/auth/login-form";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="absolute top-3 right-3 flex items-center">
        <ThemeToggle />
        <TranslatorToggle />
      </div>
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}
