import { Document } from "mongoose";

export interface StaticPressureDetails {
  type?: string;
  date?: string;
  operator?: string;
  workingPressure?: string;
  testPressure?: string;
  durationWP?: string;
  durationTP?: string;
  gaugeNo?: string;
  result?: "" | "passed" | "failed";
}

export interface TestingLengthRow {
  slNo: number;
  tagNo?: string;
  gaugeSlNo?: string;
  beforeWithoutWater?: string;
  beforeAt10psi?: string;
  duringTestL1?: string;
  afterTestL2?: string;
  elongationPercent?: string;
  remarks?: string;
}

export interface ContinuityRow {
  slNo: number;
  tagNo?: string;
  before?: string;
  during?: string;
  after?: string;
  remarks?: string;
}

export interface FinalInspectionRow {
  slNo: number;
  tagNo?: string;
  hoseBld?: string;
  assemblyLength?: string;
  endFittingVerification?: string;
  identification?: string;
  colourCodes?: string;
  remarks?: string;
}

export interface OptionsState {
  airPurging?: boolean;
  nitrogenPurging?: boolean;
  capping?: boolean;
  blueGoldCleaning?: boolean;
}

export interface FinalAcceptance {
  rows: FinalInspectionRow[];
  acceptedQty?: number;
  rejectedQty?: number;
}

export interface InspectorInfo {
  name?: string;
  date?: string;
}

export interface IFinalInspection extends Document {
  staticPressure: StaticPressureDetails;
  testingLength: TestingLengthRow[];
  continuity: ContinuityRow[];
  options: OptionsState;
  finalAcceptance: FinalAcceptance;
  inspector: InspectorInfo;
  createdAt: Date;
  updatedAt: Date;
}
