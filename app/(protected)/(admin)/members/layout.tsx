"use client";

import type React from "react";
import { useUserData } from "@/hooks/use-user-data";

interface Props {
  cards: React.ReactNode;
  header: React.ReactNode;
  table: React.ReactNode;
}

const MemberReportsLayout = ({ header, table, cards }: Props) => {
  const userData = useUserData();

  if (!userData) {
    return null;
  }

  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      {userData.role === "superadmin" && (
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
