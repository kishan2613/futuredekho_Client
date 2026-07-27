import api from "./backendapis";

/**
 * POST /lucky-name
 * Body: { name: string, dob?: string }
 */
export const getLuckyNameScore = async (name, dob = "") => {
  const payload = { name: name.trim() };
  if (dob?.trim()) {
    payload.dob = dob.trim();
  }

  const response = await api.post("/lucky-name", payload);
  return response.data;
};
