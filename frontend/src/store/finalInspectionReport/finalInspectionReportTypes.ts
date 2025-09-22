export type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
};

// Minimal list item shape used in lists and fetches
export type FinalInspectionListItem = {
  _id: string;
  staticPressure?: {
    type?: string;
    date?: string;
  };
  inspector?: {
    name?: string;
    date?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type FinalInspectionReportPayload = {
  staticPressure: {
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
  testingLength: Array<{
    slNo: number;
    tagNo: string;
    gaugeSlNo: string;
    beforeWithoutWater: string;
    beforeAt10psi: string;
    duringTestL1: string;
    afterTestL2: string;
    elongationPercent: string;
    remarks: string;
  }>;
  continuity: Array<{
    slNo: number;
    tagNo: string;
    before: string;
    during: string;
    after: string;
    remarks: string;
  }>;
  options: {
    airPurging: boolean;
    nitrogenPurging: boolean;
    capping: boolean;
    blueGoldCleaning: boolean;
  };
  finalAcceptance: {
    rows: Array<{
      slNo: number;
      tagNo: string;
      hoseBld: string;
      assemblyLength: string;
      endFittingVerification: string;
      identification: string;
      colourCodes: string;
      remarks: string;
    }>;
    acceptedQty?: number;
    rejectedQty?: number;
  };
  inspector: {
    name: string;
    date: string;
  };
};

export type FinalInspectionDetail = FinalInspectionReportPayload & {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};
