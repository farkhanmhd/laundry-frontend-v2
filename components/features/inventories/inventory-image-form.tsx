"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateInventoryImageAction } from "@/lib/modules/inventories/actions"; // You can define this like updateInventoryAction
import {
  type UpdateInventoryImageSchema,
  updateInventoryImageSchema,
} from "@/lib/modules/inventories/schema"; // Example schema import

type Props = {
  id: string;
  src: string;
};

export const InventoryImageForm = ({ id, src }: Props) => {
  // 🔹 Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Track current image preview
  const [imageSrc, setImageSrc] = useState(src);

  const { form, action } = useHookFormAction(
    updateInventoryImageAction,
    zodResolver(updateInventoryImageSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          id,
          image: imageSrc,
        },
      },
      actionProps: {
        onSettled: ({ result: { data } }) => {
          if (data?.status === "success") {
            toast.success("Image updated successfully");
            setIsEditing(false);
          }
        },
      },
    }
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCancel = () => {
    setImageSrc(src);
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // ⬅️ clears the visible filename
    }
    setIsEditing(false);
  };

  // 🔹 Submit handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const image = form.getValues("image") as File;
    const imageString = URL.createObjectURL(image);
    const formData: UpdateInventoryImageSchema = {
      id,
      image,
    };

    action.execute(formData);
    setImageSrc(imageString);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // ⬅️ clears the visible filename
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-xl">Inventory Image</h2>
        <p className="text-muted-foreground text-sm">
          Manage and update the inventory image below. You can preview new
          uploads before saving.
        </p>
      </div>

      {/* Image Preview */}
      <div className="flex justify-center">
        <Image
          alt="Inventory Image"
          className="aspect-square max-h-64 max-w-64 rounded-md object-cover"
          height={500}
          src={imageSrc}
          width={500}
        />
      </div>

      {/* Form Section */}
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="image"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-base" htmlFor={field.name}>
                  Upload New Image
                </FieldLabel>
                <Input
                  accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                  disabled={!isEditing || action.isPending}
                  name="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];

                    if (!file) {
                      form.setError("image", { message: "No file chosen" });
                      return;
                    }

                    const validTypes = ["image/jpeg", "image/png"];
                    if (!validTypes.includes(file.type)) {
                      form.setError("image", {
                        message: "Only JPEG or PNG images are allowed",
                      });
                      e.target.value = ""; // clear input
                      return;
                    }

                    form.clearErrors("image");

                    // ✅ Update preview
                    const previewUrl = URL.createObjectURL(file);
                    setImageSrc(previewUrl);

                    // ✅ Pass actual File object to React Hook Form
                    field.onChange(file);
                  }}
                  ref={fileInputRef}
                  type="file"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button
                disabled={action.isPending}
                onClick={handleCancel}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={action.isPending || !form.formState.isDirty}
                type="submit"
              >
                Save
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} type="button">
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
