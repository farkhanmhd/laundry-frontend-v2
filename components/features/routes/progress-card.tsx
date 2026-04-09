"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Navigation,
  Route as RouteIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Map as MapComponent,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerLabel,
} from "@/components/ui/map";
import { Progress } from "@/components/ui/progress";
import { elysia } from "@/elysia";
import { LAUNDRY_POINT_ZERO } from "@/lib/constants";
import type { Delivery } from "@/lib/modules/routes/data";
import { cardShadowStyle, isDone } from "@/lib/utils";

interface RouteData {
  coordinates: [number, number][];
  duration: number; // seconds
  distance: number; // meters
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) {
    return `${mins} min`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

function RouteMapNavigation({ deliveries }: { deliveries: Delivery[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const validDeliveries = deliveries.filter((d) => d.longitude && d.latitude);

  const start = {
    name: "HQ",
    lng: LAUNDRY_POINT_ZERO[0],
    lat: LAUNDRY_POINT_ZERO[1],
  };

  const waypoints = validDeliveries.map((d) => ({
    name: d.customerName,
    lng: Number(d.longitude),
    lat: Number(d.latitude),
  }));

  const coordinatesString = [
    `${start.lng},${start.lat}`,
    ...waypoints.map((wp) => `${wp.lng},${wp.lat}`),
    `${start.lng},${start.lat}`,
  ].join(";");

  const { data: routes = [], isLoading } = useQuery<RouteData[]>({
    queryKey: ["osrm-routes", coordinatesString],
    queryFn: async () => {
      if (waypoints.length === 0) {
        return [];
      }
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full&geometries=geojson&alternatives=true`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch routes");
      }
      const data = await response.json();

      if (data.routes?.length > 0) {
        // biome-ignore lint/suspicious/noExplicitAny: <Will fix later>
        return data.routes.map((route: any) => ({
          coordinates: route.geometry.coordinates,
          duration: route.duration,
          distance: route.distance,
        }));
      }
      return [];
    },
    enabled: waypoints.length > 0,
  });

  const sortedRoutes = routes
    .map((route, index) => ({ route, index }))
    .sort((a, b) => {
      if (a.index === selectedIndex) {
        return 1;
      }
      if (b.index === selectedIndex) {
        return -1;
      }
      return 0;
    });

  const mapCenter =
    waypoints.length > 0
      ? [waypoints[0].lng, waypoints[0].lat]
      : [start.lng, start.lat];

  return (
    <div className="relative mt-4 h-100 w-full overflow-hidden rounded-md border">
      <MapComponent center={mapCenter as [number, number]} zoom={15}>
        {sortedRoutes.map(({ route, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <MapRoute
              color={isSelected ? "#6366f1" : "#94a3b8"}
              coordinates={route.coordinates}
              key={index}
              onClick={() => setSelectedIndex(index)}
              opacity={isSelected ? 1 : 0.6}
              width={isSelected ? 6 : 5}
            />
          );
        })}

        <MapMarker latitude={start.lat} longitude={start.lng}>
          <MarkerContent>
            <div className="size-5 rounded-full border-2 border-white bg-black shadow-lg" />
            <MarkerLabel position="top">{start.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>

        {waypoints.map((wp, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Will fix later>
          <MapMarker key={i} latitude={wp.lat} longitude={wp.lng}>
            <MarkerContent>
              <div className="flex size-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 font-bold text-[10px] text-white shadow-lg">
                {i + 1}
              </div>
              <MarkerLabel position="bottom">{wp.name}</MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}
      </MapComponent>

      {routes.length > 0 && (
        <div className="absolute top-2 left-2 flex max-h-[90%] flex-col gap-2 overflow-y-auto p-1">
          {routes.map((route, index) => {
            const isActive = index === selectedIndex;
            const isFastest = index === 0;
            return (
              <Button
                className="h-auto justify-start gap-2 px-3 py-1.5 shadow-md"
                // biome-ignore lint/suspicious/noArrayIndexKey: <Will fix later>
                key={index}
                onClick={() => setSelectedIndex(index)}
                size="sm"
                variant={isActive ? "default" : "secondary"}
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span className="font-medium text-xs">
                    {formatDuration(route.duration)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs opacity-80">
                  <RouteIcon className="size-3" />
                  <span className="text-[10px]">
                    {formatDistance(route.distance)}
                  </span>
                </div>
                {isFastest && (
                  <span className="ml-1 rounded bg-green-100 px-1.5 py-0.5 font-medium text-[9px] text-green-700 dark:bg-green-900 dark:text-green-300">
                    Fastest
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}

type Props = {
  routeId: string;
  deliveries: Delivery[];
};

export function ProgressCard({ routeId, deliveries }: Props) {
  const t = useTranslations("Routes");
  const [showMap, setShowMap] = useState(false);
  const { refresh } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [routeFinishDialog, setRouteFinishDialog] = useState(false);
  const totalStops = deliveries.length;
  const completedCount = deliveries.filter((d) => isDone(d.status)).length;
  const progressPercentage = Math.round((completedCount / totalStops) * 100);
  const isRouteFinished = progressPercentage === 100;
  const isCompleted = deliveries.every((d) => d.status === "completed");

  const handleFinishRoute = () => {
    startTransition(() => {
      startTransition(async () => {
        try {
          const { error } = await elysia
            .routes({ id: routeId })
            .patch({}, { fetch: { credentials: "include" } });

          if (error) {
            throw new Error(error.value?.message || "Failed to complete route");
          }

          toast.success("Route completed successfully");
          refresh();
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
          }
        }
      });
    });
  };

  return (
    <Card className="gap-3" style={cardShadowStyle}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{t("routeProgress")}</CardTitle>
            <span className="font-mono text-muted-foreground text-sm uppercase">
              {routeId}
            </span>
          </div>
          <div className="text-right">
            <span className="font-bold text-3xl text-primary">
              {progressPercentage}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Progress value={progressPercentage} />
          <p className="text-right text-muted-foreground text-sm">
            {t("stopsVisited", {
              completed: completedCount,
              total: totalStops,
            })}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {showMap ? (
            <Button
              className="w-full"
              onClick={() => setShowMap(false)}
              variant="outline"
            >
              Cancel Navigation
            </Button>
          ) : (
            <Button
              className="w-full sm:w-auto sm:flex-1"
              disabled={isRouteFinished}
              onClick={() => setShowMap(true)}
            >
              <Navigation className="h-4 w-4" />
              {isRouteFinished ? t("routeFinished") : t("startNavigation")}
            </Button>
          )}

          {isRouteFinished && (
            <AlertDialog
              onOpenChange={setRouteFinishDialog}
              open={routeFinishDialog || isPending}
            >
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full gap-2 bg-green-600 text-white shadow-sm hover:bg-green-700 sm:w-auto sm:flex-1"
                  disabled={isCompleted}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {t("finishRouteAtHq")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t("processRouteCompletion")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("processRouteCompletionDescription")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isPending}
                    onClick={handleFinishRoute}
                  >
                    {t("confirmCompletion")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {showMap && <RouteMapNavigation deliveries={deliveries} />}
      </CardContent>
    </Card>
  );
}
