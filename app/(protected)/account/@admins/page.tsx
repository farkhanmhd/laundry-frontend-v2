"use client";

import { AdminDataForm } from "@/components/features/account/admin-data-form";
import { PasswordForm } from "@/components/features/account/password-form";

const MOCK_USER_DATA = {
  username: "budisantoso99",
  name: "Budi Santoso",
  phone: 1_234_567_890,
  email: "email@test.com",
};

const AccountPage = () => (
  <div className="mx-auto min-h-[calc(100dvh-128px)] max-w-3xl space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
    <AdminDataForm account={MOCK_USER_DATA} />
    <PasswordForm />
  </div>
);

export default AccountPage;
