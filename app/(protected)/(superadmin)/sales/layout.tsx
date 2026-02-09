import type React from "react";

interface Props {
  header: React.ReactNode;
  cards: React.ReactNode;
  // chart: React.ReactNode;
  tables: React.ReactNode
}

const SalesLayout = ({ header, cards, tables }: Props) => {
  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      {header}
      {cards}
      {/*{chart}*/}
      {tables}
    </section>
  );
};

export default SalesLayout;
