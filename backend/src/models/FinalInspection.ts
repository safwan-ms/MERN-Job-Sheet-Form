import mongoose, { Schema } from "mongoose";
import type { IFinalInspection } from "./types/finalInspection.js";

// Sub-schema: Static Pressure Test Details
const StaticPressureSchema = new Schema(
  {
    type: { type: String, required: false, trim: true },
    date: { type: String, required: false },
    operator: { type: String, required: false, trim: true },
    workingPressure: { type: String, required: false, trim: true },
    testPressure: { type: String, required: false, trim: true },
    durationWP: { type: String, required: false, trim: true },
    durationTP: { type: String, required: false, trim: true },
    gaugeNo: { type: String, required: false, trim: true },
    result: { type: String, enum: ["", "passed", "failed"], default: "" },
  },
  { _id: false }
);

// Sub-schema: Testing Length Row
const TestingLengthRowSchema = new Schema(
  {
    slNo: { type: Number, required: true },
    tagNo: { type: String, required: false, trim: true },
    gaugeSlNo: { type: String, required: false, trim: true },
    beforeWithoutWater: { type: String, required: false, trim: true },
    beforeAt10psi: { type: String, required: false, trim: true },
    duringTestL1: { type: String, required: false, trim: true },
    afterTestL2: { type: String, required: false, trim: true },
    elongationPercent: { type: String, required: false, trim: true },
    remarks: { type: String, required: false, trim: true },
  },
  { _id: false }
);

// Sub-schema: Continuity Row
const ContinuityRowSchema = new Schema(
  {
    slNo: { type: Number, required: true },
    tagNo: { type: String, required: false, trim: true },
    before: { type: String, required: false, trim: true },
    during: { type: String, required: false, trim: true },
    after: { type: String, required: false, trim: true },
    remarks: { type: String, required: false, trim: true },
  },
  { _id: false }
);

// Sub-schema: Final Inspection Row
const FinalInspectionRowSchema = new Schema(
  {
    slNo: { type: Number, required: true },
    tagNo: { type: String, required: false, trim: true },
    hoseBld: { type: String, required: false, trim: true },
    assemblyLength: { type: String, required: false, trim: true },
    endFittingVerification: { type: String, required: false, trim: true },
    identification: { type: String, required: false, trim: true },
    colourCodes: { type: String, required: false, trim: true },
    remarks: { type: String, required: false, trim: true },
  },
  { _id: false }
);

// Sub-schema: Options
const OptionsSchema = new Schema(
  {
    airPurging: { type: Boolean, default: false },
    nitrogenPurging: { type: Boolean, default: false },
    capping: { type: Boolean, default: false },
    blueGoldCleaning: { type: Boolean, default: false },
  },
  { _id: false }
);

// Sub-schema: Inspector
const InspectorSchema = new Schema(
  {
    name: { type: String, required: false, trim: true },
    date: { type: String, required: false },
  },
  { _id: false }
);

// Sub-schema: Final Acceptance (rows + accepted/rejected quantities)
const FinalAcceptanceSchema = new Schema(
  {
    rows: { type: [FinalInspectionRowSchema], default: [] },
    acceptedQty: { type: Number, required: false, min: 0 },
    rejectedQty: { type: Number, required: false, min: 0 },
  },
  { _id: false }
);

// Main schema tying all sections together
export const FinalInspectionSchema = new Schema<IFinalInspection>(
  {
    staticPressure: { type: StaticPressureSchema, required: true },
    testingLength: { type: [TestingLengthRowSchema], default: [] },
    continuity: { type: [ContinuityRowSchema], default: [] },
    options: { type: OptionsSchema, required: true },
    finalAcceptance: { type: FinalAcceptanceSchema, required: true },
    inspector: { type: InspectorSchema, required: true },
  },
  { timestamps: true }
);

// Model
const FinalInspection = mongoose.model<IFinalInspection>(
  "FinalInspection",
  FinalInspectionSchema
);
export default FinalInspection;
