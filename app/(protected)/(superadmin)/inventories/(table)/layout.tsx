interface Props {
  data: React.ReactNode;
  cards: React.ReactNode;
  header: React.ReactNode;
}

const InventoryLayout = ({ header, data, cards }: Props) => (
  <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
    {header}
    {cards}
    {data}
  </section>
);

export default InventoryLayout;
