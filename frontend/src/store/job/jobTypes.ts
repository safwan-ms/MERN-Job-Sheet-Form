import type { JobSheetFormData, FormErrors } from "../../types";

export type JobListItem = {
  _id: string;
  orderDetails: {
    customer: string;
    flxTagNo: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type FormStore = {
  formData: JobSheetFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  successMessage: string;
  expandedSections: Set<string>;
  jobs: JobListItem[];
  jobsLoading: boolean;
  jobsError: string;
  updateFormData: <K extends keyof JobSheetFormData>(
    section: K,
    data: Partial<JobSheetFormData[K]>
  ) => void;
  toggleSection: (sectionId: string) => void;
  setErrors: (errors: FormErrors) => void;
  setSuccessMessage: (message: string) => void;
  resetForm: () => void;
  validateWithZod: (
    data: JobSheetFormData
  ) => { ok: true } | { ok: false; errors: FormErrors };
  createJob: () => Promise<void>;
  fetchJobs: () => Promise<void>;
  // Added single job fetch and state
  jobDetail?: JobSheetFormData & {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  jobDetailLoading: boolean;
  jobDetailError: string;
  fetchJobById: (id: string) => Promise<void>;
  updateJob: (id: string, data: JobSheetFormData) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
};

export type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
};
