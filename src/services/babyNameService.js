import api from "./backendapis";

export const generateBabyNames = async (data) => {
  const response = await api.post("/baby-names/generate", data);

  return response.data;
};