import api from "./api";

export const uploadResume = async (formData) => {
  const response = await api.post(
    "/users/upload-resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const analyzeResume = async () => {
  const response = await api.post("/users/analyze-resume");

  return response.data;
};

export const getResumeAnalysis = async () => {
  const response = await api.get("/users/resume-analysis");

  return response.data;
};