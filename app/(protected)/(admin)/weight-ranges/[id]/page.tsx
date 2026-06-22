import { notFound } from "next/navigation";
import { EditWeightRangeForm } from "@/components/features/weight-ranges/weight-range-form";
import { WeightRangesApi } from "@/lib/modules/weight-ranges/data";

type Props = {
  params: Promise<{ id: string }>;
};

const EditWeightRangePage = async ({ params }: Props) => {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    notFound();
  }

  const ranges = await WeightRangesApi.getAll();
  const range = ranges?.find((r) => r.id === numericId);
  if (!range) {
    notFound();
  }

  return (
    <div className="h-[calc(100dvh-128px)] p-6 md:h-[calc(100dvh-64px)]">
      <EditWeightRangeForm
        id={range.id}
        isActive={range.isActive}
        label={range.label}
        maxWeight={Number(range.maxWeight)}
        minWeight={Number(range.minWeight)}
      />
    </div>
  );
};

export default EditWeightRangePage;
