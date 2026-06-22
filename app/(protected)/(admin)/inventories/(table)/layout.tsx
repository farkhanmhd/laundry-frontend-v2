interface Props {
  cards: React.ReactNode;
  header: React.ReactNode;
  reports: React.ReactNode;
}

const InventoryLayout = ({ header, cards, reports }: Props) => (
  <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
    {header}
    {cards}
    {reports}
  </section>
);

export default InventoryLayout;
