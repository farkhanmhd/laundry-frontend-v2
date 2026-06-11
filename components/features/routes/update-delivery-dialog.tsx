"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Camera, Check, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAlertDialog } from "@/components/providers/alert-dialog-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { elysia } from "@/elysia";
import type { Delivery } from "@/lib/modules/routes/data";
import { toastResponse } from "@/lib/toast-helper";

export const UpdateDeliveryDialog = () => {
  const { open, onOpenChange, data } = useAlertDialog<Delivery>();
  const t = useTranslations("Routes");
  const queryClient = useQueryClient();
  const tNotifications = useTranslations("Notifications");

  const [isPending, setIsPending] = useState(false);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { refresh } = useRouter();

  useEffect(() => {
    if (!(showCamera && videoRef.current && stream)) {
      return;
    }
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  }, [showCamera, stream]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      setStream(mediaStream);
      setShowCamera(true);
    } catch {
      setCameraError(t("cameraError"));
    }
  };

  const stopCamera = () => {
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }
    setStream(null);
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!(video && canvas)) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }
        setPhotoBlob(blob);
        setPhotoPreview(URL.createObjectURL(blob));
      },
      "image/jpeg",
      0.8
    );

    stopCamera();
  };

  const retakePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoBlob(null);
    setPhotoPreview(null);
    startCamera();
  };

  const handleDeliveryUpdate = async () => {
    if (!data) {
      return;
    }
    if (!photoBlob) {
      toast.error(t("photoRequired"));
      return;
    }

    setIsPending(true);
    try {
      const imageFile = new File([photoBlob], `delivery-${data.id}.jpg`, {
        type: "image/jpeg",
      });

      const { data: responseData, error } = await elysia
        .deliveries({ id: data.id })
        .status.patch(
          { image: imageFile },
          { fetch: { credentials: "include" } }
        );

      if (error) {
        throw error.value;
      }

      toast.success(toastResponse(tNotifications, responseData));
      queryClient.invalidateQueries({ queryKey: ["route-detail"] });
      onOpenChange(false);
      cleanup();
      refresh();
    } catch (err) {
      toast.error(
        toastResponse(
          tNotifications,
          (err as { messageKey?: string; message?: string }) || {}
        )
      );
    } finally {
      setIsPending(false);
    }
  };

  const cleanup = () => {
    stopCamera();
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoBlob(null);
    setPhotoPreview(null);
    setCameraError(null);
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      cleanup();
    }
  };

  const renderCameraContent = () => {
    if (showCamera) {
      return (
        <div className="relative overflow-hidden rounded-lg bg-black">
          <video
            autoPlay
            className="h-64 w-full object-cover"
            muted
            playsInline
            ref={videoRef}
          />
          <canvas className="hidden" ref={canvasRef} />
          <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
            <Button
              onClick={capturePhoto}
              size="icon"
              type="button"
              variant="secondary"
            >
              <Camera className="h-5 w-5" />
            </Button>
          </div>
        </div>
      );
    }

    if (photoPreview) {
      return (
        <div className="relative overflow-hidden rounded-lg">
          {/* biome-ignore lint: delivery photo preview */}
          <img
            alt={t("photoCaptured")}
            className="h-64 w-full object-cover"
            src={photoPreview}
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
            <Button
              onClick={retakePhoto}
              size="sm"
              type="button"
              variant="secondary"
            >
              <RotateCw className="mr-2 h-4 w-4" />
              {t("retakePhoto")}
            </Button>
          </div>
        </div>
      );
    }

    if (cameraError) {
      return (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <p className="text-destructive text-sm">{cameraError}</p>
          <Button
            onClick={startCamera}
            size="sm"
            type="button"
            variant="outline"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            {t("openCamera")}
          </Button>
        </div>
      );
    }

    return (
      <Button
        className="w-full"
        onClick={startCamera}
        type="button"
        variant="outline"
      >
        <Camera className="mr-2 h-4 w-4" />
        {t("openCamera")}
      </Button>
    );
  };

  return (
    <AlertDialog onOpenChange={handleOpenChange} open={open || isPending}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmPickup")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirmPickupDescription", {
              customerName: data?.customerName,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {renderCameraContent()}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending || !photoBlob}
            onClick={handleDeliveryUpdate}
          >
            {isPending ? (
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
