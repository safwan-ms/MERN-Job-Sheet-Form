const BASE_URL = "/api";

export const JOBS_API = {
  ROOT: `${BASE_URL}/jobs`,
  GET_ALL: `${BASE_URL}/jobs`,
  CREATE: `${BASE_URL}/jobs`,
  GET_BY_ID: (id: string) => `${BASE_URL}/jobs/${id}`,
  UPDATE: (id: string) => `${BASE_URL}/jobs/${id}`,
  DELETE: (id: string) => `${BASE_URL}/jobs/${id}`,
};
