import api from "./backendapis";

export const sendMessage = async (
  conversationId,
  message,
  palmId = null
) => {

  const response = await api.post(
    "/chat",
    {
      conversation_id: conversationId,
      message: message,
      palm_id: palmId
    }
  );

  return response.data;
};