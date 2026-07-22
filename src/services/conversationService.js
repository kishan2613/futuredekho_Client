// services/conversationService.js

import api from "./backendapis";

export const createConversation = async (userId) => {
  const response = await api.post(
    "/conversation",
    {
      user_id: userId
    }
  );

  return response.data;
};