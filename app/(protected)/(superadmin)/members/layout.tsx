import type React from "react";

interface Props {
  cards: React.ReactNode;
  header: React.ReactNode;
  table: React.ReactNode;
}

const MemberReportsLayout = ({ header, table, cards }: Props) => {
  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      {header}
      {cards}
      {table}
    </section>
  );
};

export default MemberReportsLayout;
