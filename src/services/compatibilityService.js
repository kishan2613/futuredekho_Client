import api from "./backendapis";

export const checkNameCompatibility = async (name1, name2) => {
  const response = await api.post("/compatibility/name", {
    name1: name1.trim(),
    name2: name2.trim(),
  });
  return response.data;
};
