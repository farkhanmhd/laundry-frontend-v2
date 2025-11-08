import { z } from "zod";

export const positiveIntNoLeadingZero = z.preprocess(
  (val) => {
    // Convert number to string for regex checking
    if (typeof val === "number" && Number.isInteger(val) && val > 0) {
      return String(val);
    }
    if (typeof val === "string") {
      return val;
    }
    return; // triggers validation error
  },
  z
    .string()
    .regex(/^[1-9]\d*$/, "Must be a positive integer and cannot start with 0")
    .transform((v) => Number(v))
);

export const imageSchema = z.preprocess(
  (val) =>
    val && typeof FileList !== "undefined" && val instanceof FileList
      ? val[0]
      : val,
  z
    .instanceof(File, { error: "No file chosen" })
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only JPEG or PNG images are allowed"
    )
);
