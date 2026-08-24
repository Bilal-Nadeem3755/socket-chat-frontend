const API_URL = "http://127.0.0.1:8000";

export const getRoomMessages = async (roomId, token) => {
  const response = await fetch(
    `${API_URL}/messages/${roomId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return await response.json();
};