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
    .regex(
      /^-?[1-9]\d*$/,
      "Must be a non-zero integer and cannot have leading zeros"
    )
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
    .regex(
      /^(100(\.0+)?|[1-9]\d?(\.\d+)?)$/,
      "Must be a number between 1 and 100 without leading zeros"
    )
    .transform((v) => Number(v))
    // 3. Logic Checks
    .refine((n) => n >= 1, "Minimum percentage is 1%")
    .refine((n) => n <= 100, "Maximum percentage is 100%")
    // 4. Scale Check (Matches your numeric(5, 2) database constraint)
    // Ensures user doesn't send "12.555" which Postgres would round unpredictably
    .refine((n) => {
      const decimalPart = String(n).split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    }, "Maximum 2 decimal places allowed (e.g., 12.50)")
    .transform((n) => String(n))
);
