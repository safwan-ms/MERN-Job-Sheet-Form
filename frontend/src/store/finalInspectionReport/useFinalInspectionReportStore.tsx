import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { FINAL_INSPECTION_REPORT } from "../constants";
import type { FormErrors } from "../../types";
import type {
  ApiErrorResponse,
  FinalInspectionReportPayload,
  FinalInspectionListItem,
  FinalInspectionDetail,
} from "./finalInspectionReportTypes";
import { finalInspectionReportSchema } from "@/validations/finalInspectionReportSchema";
import { ZodError } from "zod";

type FinalInspectionReportStore = {
  formData: FinalInspectionReportPayload;
  validateWithZod: (
    data: FinalInspectionReportPayload
  ) => { ok: true } | { ok: false; errors: FormErrors };
  isSubmitting: boolean;
  successMessage: string;
  errors: FormErrors;
  finalInspectionReports: FinalInspectionListItem[];
  finalInspectionReportsError: string;
  finalInspectionReportsLoading: boolean;
  finalInspectionDetail?: FinalInspectionDetail;
  finalInspectionDetailLoading: boolean;
  finalInspectionDetailError: string;
  setSuccessMessage: (message: string) => void;
  setErrors: (errors: FormErrors) => void;
  createFinalInspectionReport: (
    formData: FinalInspectionReportPayload
  ) => Promise<void>;
  fetchFinalInspectionReports: () => Promise<void>;
  fetchFinalInspectionReportById: (id: string) => Promise<void>;
  updateFinalInspectionReport: (
    id: string,
    data: FinalInspectionReportPayload
  ) => Promise<void>;
  deleteFinalInspectionReport: (id: string) => Promise<void>;
};

const initialFormData: FinalInspectionReportPayload = {
  staticPressure: {
    type: "",
    date: "",
    operator: "",
    workingPressure: "",
    testPressure: "",
    durationWP: "",
    durationTP: "",
    gaugeNo: "",
    result: "", // can be "", "passed", "failed"
  },
  testingLength: [
    {
      slNo: 1,
      tagNo: "",
      gaugeSlNo: "",
      beforeWithoutWater: "",
      beforeAt10psi: "",
      duringTestL1: "",
      afterTestL2: "",
      elongationPercent: "",
      remarks: "",
    },
  ],
  continuity: [
    {
      slNo: 1,
      tagNo: "",
      before: "",
      during: "",
      after: "",
      remarks: "",
    },
  ],
  options: {
    airPurging: false,
    nitrogenPurging: false,
    capping: false,
    blueGoldCleaning: false,
  },
  finalAcceptance: {
    rows: [
      {
        slNo: 1,
        tagNo: "",
        hoseBld: "",
        assemblyLength: "",
        endFittingVerification: "",
        identification: "",
        colourCodes: "",
        remarks: "",
      },
    ],
    acceptedQty: 0,
    rejectedQty: 0,
  },
  inspector: {
    name: "",
    date: "",
  },
};
const mapPathToFlatKey = (path: string[]): string => {
  const joined = path.join(".");
  const map: Record<string, string> = {
    // --- Static Pressure ---
    "staticPressure.type": "type",
    "staticPressure.date": "date",
    "staticPressure.operator": "operator",
    "staticPressure.workingPressure": "workingPressure",
    "staticPressure.testPressure": "testPressure",
    "staticPressure.durationWP": "durationWP",
    "staticPressure.durationTP": "durationTP",
    "staticPressure.gaugeNo": "gaugeNo",
    "staticPressure.result": "result",

    // --- Testing Length ---
    "testingLength.slNo": "slNo",
    "testingLength.tagNo": "tagNo",
    "testingLength.gaugeSlNo": "gaugeSlNo",
    "testingLength.beforeWithoutWater": "beforeWithoutWater",
    "testingLength.beforeAt10psi": "beforeAt10psi",
    "testingLength.duringTestL1": "duringTestL1",
    "testingLength.afterTestL2": "afterTestL2",
    "testingLength.elongationPercent": "elongationPercent",
    "testingLength.remarks": "remarks",

    // --- Continuity ---
    "continuity.slNo": "slNo",
    "continuity.tagNo": "tagNo",
    "continuity.before": "before",
    "continuity.during": "during",
    "continuity.after": "after",
    "continuity.remarks": "remarks",

    // --- Options ---
    "options.airPurging": "airPurging",
    "options.nitrogenPurging": "nitrogenPurging",
    "options.capping": "capping",
    "options.blueGoldCleaning": "blueGoldCleaning",

    // --- Final Acceptance (rows + summary) ---
    "finalAcceptance.rows.slNo": "slNo",
    "finalAcceptance.rows.tagNo": "tagNo",
    "finalAcceptance.rows.hoseBld": "hoseBld",
    "finalAcceptance.rows.assemblyLength": "assemblyLength",
    "finalAcceptance.rows.endFittingVerification": "endFittingVerification",
    "finalAcceptance.rows.identification": "identification",
    "finalAcceptance.rows.colourCodes": "colourCodes",
    "finalAcceptance.rows.remarks": "remarks",
    "finalAcceptance.acceptedQty": "acceptedQty",
    "finalAcceptance.rejectedQty": "rejectedQty",

    // --- Inspector ---
    "inspector.name": "name",
    "inspector.date": "date",
  };

  return map[joined] ?? joined; // fallback: return joined if not explicitly mapped
};

export const useFinalInspectionReportStore = create<FinalInspectionReportStore>(
  (set, get) => ({
    formData: initialFormData,
    isSubmitting: false,
    successMessage: "",
    errors: {},
    finalInspectionReports: [],
    finalInspectionReportsError: "",
    finalInspectionReportsLoading: false,
    finalInspectionDetail: undefined,
    finalInspectionDetailLoading: false,
    finalInspectionDetailError: "",
    setSuccessMessage: (message: string) => set({ successMessage: message }),
    setErrors: (errors: FormErrors) => set({ errors }),

    validateWithZod: (data: FinalInspectionReportPayload) => {
      try {
        finalInspectionReportSchema.parse(data);
        return { ok: true } as const;
      } catch (err) {
        const newErrors: FormErrors = {};
        if (err instanceof ZodError) {
          err.issues.forEach((issue) => {
            const key = mapPathToFlatKey(issue.path as string[]);
            if (!newErrors[key]) newErrors[key] = issue.message;
          });
        }
        return { ok: false, errors: newErrors } as const;
      }
    },

    createFinalInspectionReport: async () => {
      const { formData, validateWithZod } = get();
      set({ isSubmitting: true, successMessage: "", errors: {} });
      const validation = validateWithZod(formData);
      if (!validation.ok) {
        set({ errors: validation.errors, isSubmitting: false });
        return;
      }

      try {
        set({ isSubmitting: true });
        const response = await axios.post(FINAL_INSPECTION_REPORT, formData);
        if (response.data?.success) {
          set({
            successMessage: "Final Inspection Report saved successfully.",
          });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<ApiErrorResponse>;
        if (
          err?.response?.status === 400 &&
          Array.isArray(err.response.data?.errors)
        ) {
          const backendErrors = err.response.data.errors as Array<{
            field: string;
            message: string;
          }>;
          const newErrors: FormErrors = {};
          backendErrors.forEach((e) => {
            const key = mapPathToFlatKey(e.field.split("."));
            if (!newErrors[key]) newErrors[key] = e.message;
          });
          set({ errors: newErrors });
        } else if (err?.response?.data?.message) {
          set({ successMessage: "" });
          alert(err.response.data.message);
        } else {
          set({ successMessage: "" });
          alert("Failed to save report. Please try again.");
        }
      } finally {
        set({ isSubmitting: false });
      }
    },

    fetchFinalInspectionReports: async () => {
      try {
        set({
          finalInspectionReportsLoading: true,
          finalInspectionReportsError: "",
        });
        const response = await axios.get(FINAL_INSPECTION_REPORT);
        if (response.data?.success) {
          set({ finalInspectionReports: response.data.data || [] });
        } else {
          set({
            finalInspectionReportsError:
              response.data?.message ||
              "Failed to fetch final inspection reports.",
          });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        set({
          finalInspectionReportsError:
            err.response?.data?.message ||
            "Failed to fetch final inspection reports.",
        });
      } finally {
        set({ finalInspectionReportsLoading: false });
      }
    },

    fetchFinalInspectionReportById: async (id: string) => {
      try {
        set({
          finalInspectionDetailLoading: true,
          finalInspectionDetailError: "",
        });
        const response = await axios.get(`${FINAL_INSPECTION_REPORT}/${id}`);
        const data = response.data?.data ?? response.data;
        set({ finalInspectionDetail: data });
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        set({
          finalInspectionDetailError:
            err.response?.data?.message || "Failed to fetch report.",
        });
      } finally {
        set({ finalInspectionDetailLoading: false });
      }
    },

    updateFinalInspectionReport: async (
      id: string,
      data: FinalInspectionReportPayload
    ) => {
      try {
        set({ isSubmitting: true, successMessage: "", errors: {} });

        // Validate with Zod schema
        finalInspectionReportSchema.parse(data);

        const response = await axios.put(
          `${FINAL_INSPECTION_REPORT}/${id}`,
          data
        );
        if (response.data?.success) {
          set({
            successMessage: "Final Inspection Report updated successfully.",
            finalInspectionDetail: response.data.data,
          });
        }
      } catch (error: unknown) {
        // Handle Zod validation errors
        if (error instanceof ZodError) {
          const newErrors: FormErrors = {};
          error.issues.forEach((issue) => {
            const path = issue.path.join(".");
            newErrors[path] = issue.message;
          });
          set({ errors: newErrors });
          return;
        }

        // Handle API errors
        const err = error as AxiosError<ApiErrorResponse>;
        if (
          err?.response?.status === 400 &&
          Array.isArray(err.response.data?.errors)
        ) {
          const backendErrors = err.response.data.errors as Array<{
            field: string;
            message: string;
          }>;
          const newErrors: FormErrors = {};
          backendErrors.forEach((e) => {
            const key = e.field;
            if (!newErrors[key]) newErrors[key] = e.message;
          });
          set({ errors: newErrors });
        } else if (err?.response?.data?.message) {
          set({ successMessage: "" });
          alert(err.response.data.message);
        } else {
          set({ successMessage: "" });
          alert("Failed to update report. Please try again.");
        }
      } finally {
        set({ isSubmitting: false });
      }
    },

    deleteFinalInspectionReport: async (id: string) => {
      try {
        set({ isSubmitting: true, successMessage: "", errors: {} });
        const response = await axios.delete(`${FINAL_INSPECTION_REPORT}/${id}`);
        if (response.data?.success) {
          set({
            successMessage: "Final Inspection Report deleted successfully.",
            finalInspectionDetail: undefined,
          });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<ApiErrorResponse>;
        if (err?.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("Failed to delete report. Please try again.");
        }
      } finally {
        set({ isSubmitting: false });
      }
    },
  })
);
