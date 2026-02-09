import { z } from "zod";

const rangeRegex = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/;

export const pdfRangeSchema = z.string()
  .min(1, "Range cannot be empty")
  .regex(rangeRegex, "Invalid format. Use numbers, commas, and hyphens (e.g., 1,2-5)");
