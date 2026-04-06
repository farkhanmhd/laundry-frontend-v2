"use client";

import {
  Check,
  Clock,
  Loader2,
  Map as MapIcon,
  MapPin,
  Phone,
  Route as RouteIcon,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Map as MapComponent,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerLabel,
} from "@/components/ui/map";
import { Separator } from "@/components/ui/separator";
import { LAUNDRY_POINT_ZERO } from "@/lib/constants";
import type { Delivery } from "@/lib/modules/routes/data";
import { cardShadowStyle, cn, isDone } from "@/lib/utils";

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

function DeliveryMapNavigation({ delivery }: { delivery: Delivery }) {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const start = {
    name: "HQ",
    lng: LAUNDRY_POINT_ZERO[0],
    lat: LAUNDRY_POINT_ZERO[1],
  };
  const end = {
    name: delivery.customerName,
    lng: Number(delivery.longitude),
    lat: Number(delivery.latitude),
  };

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&alternatives=true`
        );
        const data = await response.json();

        if (data.routes?.length > 0) {
          // biome-ignore lint/suspicious/noExplicitAny: <Will fix later>
          const routeData: RouteData[] = data.routes.map((route: any) => ({
            coordinates: route.geometry.coordinates,
            duration: route.duration,
            distance: route.distance,
          }));
          setRoutes(routeData);
        }
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoutes();
  }, [start.lng, start.lat, end.lng, end.lat]);

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

  return (
    <div className="relative mt-4 h-75 w-full overflow-hidden rounded-md border">
      <MapComponent center={[end.lng, end.lat]} zoom={12}>
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
            <div className="size-4 rounded-full border-2 border-white bg-green-500 shadow-lg" />
            <MarkerLabel position="top">{start.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>

        <MapMarker latitude={end.lat} longitude={end.lng}>
          <MarkerContent>
            <div className="size-4 rounded-full border-2 border-white bg-red-500 shadow-lg" />
            <MarkerLabel position="bottom">{end.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>
      </MapComponent>

      {routes.length > 0 && (
        <div className="absolute top-2 left-2 flex max-h-[90%] flex-col gap-2 overflow-y-auto p-1">
          {routes.map((route, index) => {
            const isActive = index === selectedIndex;
            const isFastest = index === 0;
            return (
              <Button
                className="h-auto justify-start gap-2 px-3 py-1.5"
                // biome-ignore lint/suspicious/noArrayIndexKey: <will fix later>
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
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

type Props = {
  delivery: Delivery;
};

export function TimelineItem({ delivery }: Props) {
  const t = useTranslations("Routes");
  const done = isDone(delivery.status);
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="relative flex gap-4">
      <Card
        className={cn("flex-1 gap-2 transition-opacity", done && "opacity-80")}
        style={cardShadowStyle}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="uppercase">
                {delivery.type === "delivery" ? t("delivery") : t("pickup")}
              </Badge>
              <span className="hidden text-muted-foreground text-sm sm:inline">
                {delivery.id.toUpperCase()}
              </span>
            </div>
            <CardTitle className="pt-1 text-base">
              {delivery.customerName}
            </CardTitle>
          </div>

          {delivery.status === "in_progress" ||
          delivery.status === "requested" ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Check className="h-4 w-4" />
                  {t("markPickedUp")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("confirmPickup")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("confirmPickupDescription", {
                      customerName: delivery.customerName,
                    })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Badge className="uppercase">
              {delivery.status === "picked_up" ? t("pickedUp") : t("completed")}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">{delivery.addressLabel}</p>
              <p className="text-muted-foreground leading-snug">
                {delivery.address}
              </p>
            </div>
          </div>
          {delivery.notes && (
            <div className="flex items-center gap-2 rounded-md bg-muted p-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="text-xs italic">"{delivery.notes}"</span>
            </div>
          )}
          <Separator />
          <div className="flex items-center justify-between pt-1">
            <Link
              className={cn(buttonVariants({ variant: "outline" }))}
              href={`/orders/${delivery.orderId}`}
            >
              {t("viewOrder")}
            </Link>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <a href={`tel:${delivery.customerPhone}`}>
                  <Phone className="h-3.5 w-3.5" />
                  {t("call")}
                </a>
              </Button>
              {showMap ? (
                <Button
                  onClick={() => setShowMap(false)}
                  size="sm"
                  variant="outline"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => setShowMap(true)}
                  size="sm"
                  variant="outline"
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  {t("map")}
                </Button>
              )}
            </div>
          </div>
          {showMap && <DeliveryMapNavigation delivery={delivery} />}
        </CardContent>
      </Card>
    </div>
  );
}
