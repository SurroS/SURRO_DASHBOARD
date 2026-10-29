import apiClient from "./client";
import type { MessageResponse } from "./types";

export const kycService = {
  submit: (formData: FormData) =>
    apiClient.post<MessageResponse>("/kyc/submit", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data),
};
