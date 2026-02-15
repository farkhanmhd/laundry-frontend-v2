'use client'

import type React from "react";
import { authClient } from "@/lib/modules/auth/auth-client";

interface Props {
  cards: React.ReactNode;
  header: React.ReactNode;
  table: React.ReactNode;
}

const MemberReportsLayout = ({ header, table, cards }: Props) => {
  const { data} = authClient.useSession()

  if (!data) {
    return null
  }

  const role = data.user.role

  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      {role === 'superadmin' && (
        <>
          {header}
          {cards}
        </>
      )}
      {table}
    </section>
  );
};

export default MemberReportsLayout;
