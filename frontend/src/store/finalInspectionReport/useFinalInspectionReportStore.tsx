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
    data: FinalInspectionReportPayload
  ) => Promise<void>;
  fetchFinalInspectionReports: () => Promise<void>;
  fetchFinalInspectionReportById: (id: string) => Promise<void>;
  updateFinalInspectionReport: (
    id: string,
    data: FinalInspectionReportPayload
  ) => Promise<void>;
  deleteFinalInspectionReport: (id: string) => Promise<void>;
};

export const useFinalInspectionReportStore = create<FinalInspectionReportStore>(
  (set) => ({
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

    createFinalInspectionReport: async (data: FinalInspectionReportPayload) => {
      try {
        set({ isSubmitting: true, successMessage: "", errors: {} });

        // Validate with Zod schema
        finalInspectionReportSchema.parse(data);

        const response = await axios.post(FINAL_INSPECTION_REPORT, data);
        if (response.data?.success) {
          set({
            successMessage: "Final Inspection Report saved successfully.",
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
            const key = e.field; // already dot-notated by backend
            if (!newErrors[key]) newErrors[key] = e.message;
          });
          set({ errors: newErrors });
        } else if (err?.response?.data?.message) {
          set({ successMessage: "" });
          alert(err.response.data.message);
        } else {
          set({ successMessage: "" });
          alert("Failed to save final inspection report. Please try again.");
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
