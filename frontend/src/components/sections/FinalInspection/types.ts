export type StaticPressureDetails = {
  type: string;
  date: string;
  operator: string;
  workingPressure: string;
  testPressure: string;
  durationWP: string;
  durationTP: string;
  gaugeNo: string;
  result: "passed" | "failed" | "";
};

export type TestingLengthRow = {
  slNo: number;
  tagNo: string;
  gaugeSlNo: string;
  beforeWithoutWater: string;
  beforeAt10psi: string;
  duringTestL1: string;
  afterTestL2: string;
  elongationPercent: string;
  remarks: string;
};

export type ContinuityRow = {
  slNo: number;
  tagNo: string;
  before: string;
  during: string;
  after: string;
  remarks: string;
};

export type FinalInspectionRow = {
  slNo: number;
  tagNo: string;
  hoseBld: string;
  assemblyLength: string;
  endFittingVerification: string;
  identification: string;
  colourCodes: string;
  remarks: string;
};

export type OptionsState = {
  airPurging: boolean;
  nitrogenPurging: boolean;
  capping: boolean;
  blueGoldCleaning: boolean;
};

export type ExpandState = {
  staticPressure: boolean;
  testingLength: boolean;
  continuity: boolean;
  options: boolean;
  finalAcceptance: boolean;
  inspector: boolean;
};

export const inputBase =
  "w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export const labelBase = "text-sm font-medium text-gray-700";
