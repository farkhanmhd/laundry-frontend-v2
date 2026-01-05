"use client";

import {
  Check,
  CheckCircle2,
  Clock,
  Map as MapIcon,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import Link from "next/link";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cardShadowStyle, cn } from "@/lib/utils";

// --- MOCK DATA ---

const routeDetail = {
  id: "rt-105",
  status: "progress",
  totalStops: 4,
  createdAt: "2025-12-15T08:00:00Z",

  items: [
    {
      id: "dri-1",
      sequence: 1,
      delivery: {
        id: "dlv-2",
        status: "picked_up", // Already visited
        type: "delivery",
        customer: {
          name: "Alice Johnson",
          phone: "+62 812-3456-7890",
        },
        address: {
          id: "addr-1",
          label: "Home",
          fullAddress: "Jl. Merpati No. 45, Medan, North Sumatra",
          lat: 3.5852,
          lng: 98.6756,
        },
        note: "Gate code is 1234. Call when arrived.",
      },
    },
    {
      id: "dri-2",
      sequence: 2,
      delivery: {
        id: "dlv-4",
        status: "progress", // Current Target
        type: "delivery",
        customer: {
          name: "Sarah Lee",
          phone: "+62 813-5566-7788",
        },
        address: {
          id: "addr-2",
          label: "Office",
          fullAddress: "Jl. Sudirman No. 5, Medan Petisah",
          lat: 3.59,
          lng: 98.67,
        },
        note: "Leave at reception desk.",
      },
    },
    {
      id: "dri-3",
      sequence: 3,
      delivery: {
        id: "dlv-3",
        status: "progress",
        type: "delivery",
        customer: {
          name: "Coffee Shop Kenangan",
          phone: "+62 811-2233-4455",
        },
        address: {
          id: "addr-3",
          label: "Store",
          fullAddress: "Jl. Pattimura No. 10 (Staff Entrance)",
          lat: 3.57,
          lng: 98.66,
        },
        note: "Pickup dirty aprons from back door.",
      },
    },
    {
      id: "dri-4",
      sequence: 4,
      delivery: {
        id: "dlv-5",
        status: "progress",
        type: "delivery",
        customer: {
          name: "Rina Wati",
          phone: "+62 877-1122-3344",
        },
        address: {
          id: "addr-4",
          label: "Apartment",
          fullAddress: "Komplek Asia Mega Mas, Block DD, Medan",
          lat: 3.58,
          lng: 98.69,
        },
        note: null,
      },
    },
  ],
};

// --- HELPER FUNCTIONS ---

const generateGoogleMapsLink = (items: typeof routeDetail.items) => {
  if (items.length === 0) {
    return "#";
  }

  const hqLocation = "3.595,98.672";
  const origin = hqLocation;
  const destination = hqLocation;

  const waypoints = items
    .map((item) => `${item.delivery.address.lat},${item.delivery.address.lng}`)
    .join("|");

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
};

export default function RouteDetailPage() {
  const route = routeDetail;

  // Logic: "picked_up" means the driver has done their part.
  // "completed" means HQ has processed it. Both count towards driver progress.
  const completedCount = route.items.filter(
    (i) =>
      i.delivery.status === "picked_up" || i.delivery.status === "completed"
  ).length;

  const progressPercentage = Math.round(
    (completedCount / route.totalStops) * 100
  );
  const isRouteFinished = progressPercentage === 100;

  return (
    <div className="space-y-6 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* PROGRESS & ACTIONS CARD */}
        <Card className="gap-3" style={cardShadowStyle}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Route Progress</CardTitle>
                <span className="font-mono text-muted-foreground text-sm uppercase">
                  {route.id}
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
              {/* Progress Bar */}
              {/* <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                /> */}
              <Progress value={progressPercentage} />

              <p className="text-right text-muted-foreground text-sm">
                {
                  route.items.filter(
                    (i) =>
                      i.delivery.status === "picked_up" ||
                      i.delivery.status === "completed"
                  ).length
                }{" "}
                of {route.totalStops} stops visited
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Start Navigation Button */}
              <Button
                className="w-full"
                disabled={isRouteFinished}
                onClick={() =>
                  window.open(generateGoogleMapsLink(route.items), "_blank")
                }
              >
                <Navigation className="h-4 w-4" />
                {isRouteFinished ? "Route Finished" : "Start Navigation"}
              </Button>

              {/* Complete Route Action (Only visible when 100%) */}
              {isRouteFinished && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex-1 gap-2 bg-green-600 text-white shadow-sm hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Finish Route at HQ
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Process Route Completion
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        All items have been picked up/delivered. Confirming this
                        will mark all items as <strong>Completed</strong>,
                        indicating they have been received at HQ or successfully
                        delivered to the customer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-green-600 hover:bg-green-700">
                        Confirm Completion
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* TIMELINE ITEMS */}
        <div className="relative space-y-4">
          {/* Vertical Connector Line */}
          <div className="-z-10 absolute top-6 bottom-6 left-8 w-0.5 bg-muted-foreground/20" />

          {route.items.map((item) => {
            const isCompleted =
              item.delivery.status === "picked_up" ||
              item.delivery.status === "completed";

            return (
              <div className="relative flex gap-4" key={item.id}>
                {/* Detail Card */}
                <Card
                  className={cn(
                    "flex-1 transition-opacity",
                    isCompleted && "opacity-80",
                    "gap-2"
                  )}
                  style={cardShadowStyle}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className="uppercase">
                          {item.delivery.type}
                        </Badge>
                        <span className="hidden text-muted-foreground text-sm sm:inline">
                          {item.delivery.id.toUpperCase()}
                        </span>
                      </div>
                      <CardTitle className="pt-1 text-base">
                        {item.delivery.customer.name}
                      </CardTitle>
                    </div>

                    {/* STATUS ACTION */}
                    {item.delivery.status === "progress" ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Check className="h-4 w-4" />
                            Mark Picked Up
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Pickup</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you have collected/delivered the
                              items for{" "}
                              <strong>{item.delivery.customer.name}</strong>?
                              This will update the status to{" "}
                              <strong>Picked Up</strong>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Confirm</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <Badge className={cn("uppercase")}>
                        {item.delivery.status.replace("_", " ")}
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4 text-sm">
                    {/* Address Section */}
                    <div className="flex gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {item.delivery.address.label}
                        </p>
                        <p className="text-muted-foreground leading-snug">
                          {item.delivery.address.fullAddress}
                        </p>
                      </div>
                    </div>

                    {/* Notes Section */}
                    {item.delivery.note && (
                      <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                        <span className="text-xs italic">
                          "{item.delivery.note}"
                        </span>
                      </div>
                    )}

                    <Separator />

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <Link
                        className={cn(buttonVariants({ variant: "outline" }))}
                        href={`/orders/${item.delivery.id.replace("dlv-", "o-")}`}
                      >
                        View Order
                      </Link>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <a href={`tel:${item.delivery.customer.phone}`}>
                            <Phone className="h-3.5 w-3.5" />
                            Call
                          </a>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${item.delivery.address.lat},${item.delivery.address.lng}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <MapIcon className="h-3.5 w-3.5" />
                            Map
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
