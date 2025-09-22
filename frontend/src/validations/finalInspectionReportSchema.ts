import { z } from "zod";

// Helper: ISO date (YYYY-MM-DD) or empty
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
  .optional();

// Static Pressure validation
const staticPressureSchema = z.object({
  type: z.string().min(1, "Type is required"),
  date: dateSchema,
  operator: z.string().min(1, "Operator is required"),
  workingPressure: z.number().min(0, "Must be a positive number"),
  testPressure: z.number().min(0, "Must be a positive number"),
  durationWP: z.number().min(1, "Duration (WP) required"),
  durationTP: z.number().min(1, "Duration (TP) required"),
  gaugeNo: z.string().min(1, "Gauge number required"),
  result: z.enum(["passed", "failed"], "Result is required"),
});

// Testing Length Row validation
const testingLengthRowSchema = z.object({
  slNo: z.number().min(1),
  tagNo: z.string().min(1, "Tag number required"),
  gaugeSlNo: z.string().min(1, "Gauge serial number required"),
  beforeWithoutWater: z.number().min(0),
  beforeAt10psi: z.number().min(0),
  duringTestL1: z.number().min(0),
  afterTestL2: z.number().min(0),
  elongationPercent: z.number().min(0).max(100),
  remarks: z.string().optional(),
});

// Continuity Row validation
const continuityRowSchema = z.object({
  slNo: z.number().min(1),
  tagNo: z.string().min(1),
  before: z.number().min(0),
  during: z.number().min(0),
  after: z.number().min(0),
  remarks: z.string().optional(),
});

// Final Inspection Row validation
const finalInspectionRowSchema = z.object({
  slNo: z.number().min(1),
  tagNo: z.string().min(1),
  hoseBld: z.string().min(1),
  assemblyLength: z.number().min(0),
  endFittingVerification: z.enum(["ok", "not_ok"]),
  identification: z.string().min(1),
  colourCodes: z.string().min(1),
  remarks: z.string().optional(),
});

// Options validation
const optionsSchema = z.object({
  airPurging: z.boolean().default(false),
  nitrogenPurging: z.boolean().default(false),
  capping: z.boolean().default(false),
  blueGoldCleaning: z.boolean().default(false),
});

// Inspector validation
const inspectorSchema = z.object({
  name: z.string().min(1, "Inspector name required"),
  date: dateSchema,
});

// Final Acceptance validation
const finalAcceptanceSchema = z.object({
  rows: z.array(finalInspectionRowSchema).min(1, "At least one row required"),
  acceptedQty: z.number().min(0).default(0),
  rejectedQty: z.number().min(0).default(0),
});

// Main Final Inspection Report schema
export const finalInspectionReportSchema = z.object({
  staticPressure: staticPressureSchema,
  testingLength: z
    .array(testingLengthRowSchema)
    .min(1, "At least one test row"),
  continuity: z
    .array(continuityRowSchema)
    .min(1, "At least one continuity row"),
  options: optionsSchema,
  finalAcceptance: finalAcceptanceSchema,
  inspector: inspectorSchema,
});

export type FinalInspectionReportFormData = z.infer<
  typeof finalInspectionReportSchema
>;
