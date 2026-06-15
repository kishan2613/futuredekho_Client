import api from "./backendapis";

export const sendMessage = async (message) => {
  const response = await api.post(
    "/chat",
    {
      message
    }
  );

  return response.data;
};