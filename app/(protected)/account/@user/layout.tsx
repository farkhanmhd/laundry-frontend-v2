import { PasswordForm } from "@/components/features/account/password-form";

interface Props {
  account: React.ReactNode;
}

const AccountLayout = ({ account }: Props) => {
  return (
    <div className="min-h-[calc(100dvh-128px)] max-w-3xl space-y-6 p-6 md:min-h-[calc(100dvh-64px)] lg:mx-auto">
      {account}
      <PasswordForm />
    </div>
  );
};

export default AccountLayout;
