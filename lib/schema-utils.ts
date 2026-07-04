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
    .regex(/^[1-9]\d*$/, "numeric.positiveInt")
    .transform((v) => Number(v))
);

export const imageSchema = z.preprocess(
  (val) =>
    val && typeof FileList !== "undefined" && val instanceof FileList
      ? val[0]
      : val,
  z
    .instanceof(File, { error: "images.noFile" })
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "images.invalidType"
    )
);

export const nonZeroIntegerSchema = z.preprocess(
  (val) => {
    // Convert number to string for regex checking
    if (typeof val === "number" && Number.isInteger(val) && val !== 0) {
      return String(val);
    }
    if (typeof val === "string") {
      return val;
    }
    return;
  },
  z
    .string()
    .regex(/^-?[1-9]\d*$/, "numeric.nonZeroInt")
    .transform((v) => Number(v))
);

export const percentageSchema = z.preprocess(
  (val) => {
    // 1. Convert numbers to string for uniform regex checking
    // We strictly check for valid numbers (excluding NaN)
    if (typeof val === "number" && !Number.isNaN(val)) {
      return String(val);
    }
    if (typeof val === "string") {
      return val;
    }
    return val;
  },
  z
    .string()
    // 2. Regex: Allows "1", "10", "12.5", "100"
    // - ^(100 ... : Handles 100 explicitly
    // - |[1-9]\d? : Matches 1-9 or 10-99 (No leading zeros like '05')
    // - (\.\d+)?$ : Allows optional decimals (e.g. .5, .25)
    .regex(/^(100(\.0+)?|[1-9]\d?(\.\d+)?)$/, "numeric.percentageFormat")
    .transform((v) => Number(v))
    // 3. Logic Checks
    .refine((n) => n >= 1, "numeric.percentageMin")
    .refine((n) => n <= 100, "numeric.percentageMax")
    // 4. Scale Check (Matches your numeric(5, 2) database constraint)
    // Ensures user doesn't send "12.555" which Postgres would round unpredictably
    .refine((n) => {
      const decimalPart = String(n).split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    }, "numeric.decimalPlaces")
    .transform((n) => String(n))
);

export const booleanFromString = z.preprocess((val) => {
  if (typeof val === "string") {
    if (val === "true") {
      return true;
    }
    if (val === "false") {
      return false;
    }
  }
  return val;
}, z.boolean());
