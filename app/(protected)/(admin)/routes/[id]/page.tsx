import { ProgressCard } from "@/components/features/routes/progress-card";
import { TimelineItem } from "@/components/features/routes/timeline-item";
import { RoutesApi } from "@/lib/modules/routes/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RouteDetailPage({ params }: Props) {
  const { id } = await params;
  const route = await RoutesApi.getRouteDetail(id);

  if (!route) {
    return <div>Route not found</div>;
  }

  const deliveries = route.deliveries;

  return (
    <div className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:min-h-[calc(100dvh-64px)]">
      <div className="mx-auto max-w-3xl space-y-6">
        <ProgressCard deliveries={deliveries} routeId={route.id} />

        <div className="relative space-y-4">
          {deliveries.map((delivery) => (
            <TimelineItem delivery={delivery} key={delivery.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
