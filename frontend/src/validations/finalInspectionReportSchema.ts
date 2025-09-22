import { z } from "zod";

// Static Pressure validation
const staticPressureSchema = z.object({
  type: z.string().trim().optional().default(""),
  date: z.string().optional().default(""),
  operator: z.string().trim().optional().default(""),
  workingPressure: z.string().trim().optional().default(""),
  testPressure: z.string().trim().optional().default(""),
  durationWP: z.string().trim().optional().default(""),
  durationTP: z.string().trim().optional().default(""),
  gaugeNo: z.string().trim().optional().default(""),
  result: z.enum(["", "passed", "failed"]).default(""),
});

// Testing Length Row validation
const testingLengthRowSchema = z.object({
  slNo: z.number(),
  tagNo: z.string().trim().optional().default(""),
  gaugeSlNo: z.string().trim().optional().default(""),
  beforeWithoutWater: z.string().trim().optional().default(""),
  beforeAt10psi: z.string().trim().optional().default(""),
  duringTestL1: z.string().trim().optional().default(""),
  afterTestL2: z.string().trim().optional().default(""),
  elongationPercent: z.string().trim().optional().default(""),
  remarks: z.string().trim().optional().default(""),
});

// Continuity Row validation
const continuityRowSchema = z.object({
  slNo: z.number(),
  tagNo: z.string().trim().optional().default(""),
  before: z.string().trim().optional().default(""),
  during: z.string().trim().optional().default(""),
  after: z.string().trim().optional().default(""),
  remarks: z.string().trim().optional().default(""),
});

// Final Inspection Row validation
const finalInspectionRowSchema = z.object({
  slNo: z.number(),
  tagNo: z.string().trim().optional().default(""),
  hoseBld: z.string().trim().optional().default(""),
  assemblyLength: z.string().trim().optional().default(""),
  endFittingVerification: z.string().trim().optional().default(""),
  identification: z.string().trim().optional().default(""),
  colourCodes: z.string().trim().optional().default(""),
  remarks: z.string().trim().optional().default(""),
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
  name: z.string().trim().optional().default(""),
  date: z.string().optional().default(""),
});

// Final Acceptance validation
const finalAcceptanceSchema = z.object({
  rows: z.array(finalInspectionRowSchema).default([]),
  acceptedQty: z.number().min(0).optional(),
  rejectedQty: z.number().min(0).optional(),
});

// Main Final Inspection Report schema
export const finalInspectionReportSchema = z.object({
  staticPressure: staticPressureSchema,
  testingLength: z.array(testingLengthRowSchema).default([]),
  continuity: z.array(continuityRowSchema).default([]),
  options: optionsSchema,
  finalAcceptance: finalAcceptanceSchema,
  inspector: inspectorSchema,
});

export type FinalInspectionReportFormData = z.infer<
  typeof finalInspectionReportSchema
>;
