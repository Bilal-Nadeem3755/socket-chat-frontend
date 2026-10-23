
let socket = null;

// Connect WebSocket
export const connectSocket = (room, token) => {
  if (!room || !token) {
    console.error("Room or token is missing");
    return null;
  }

  // Close existing connection
  if (socket) {
    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close();
    }

    socket = null;
  }

  // Get WebSocket base URL from environment variables
  const wsBaseUrl = import.meta.env.VITE_WS_URL;

  if (!wsBaseUrl) {
    console.error("VITE_WS_URL is not configured");
    return null;
  }

  const wsUrl =
    `${wsBaseUrl.replace(/\/+$/, "")}/ws/${encodeURIComponent(room)}` +
    `?token=${encodeURIComponent(token)}`;

  // Create WebSocket connection
  socket = new WebSocket(wsUrl);

  socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  socket.onclose = (event) => {
    console.log(
      "WebSocket closed:",
      event.code,
      event.reason || "No reason provided"
    );
  };

  socket.onopen = () => {
    console.log("WebSocket connected successfully");
  };

  return socket;
};

// Get current socket
export const getSocket = () => {
  return socket;
};

// Send WebSocket message
export const sendSocketMessage = (data) => {
  if (!socket) {
    console.error("WebSocket is not initialized");
    return false;
  }

  if (socket.readyState !== WebSocket.OPEN) {
    console.error("WebSocket is not connected");
    return false;
  }

  try {
    socket.send(JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Failed to send WebSocket message:", error);
    return false;
  }
};

// Disconnect WebSocket
export const disconnectSocket = () => {
  if (!socket) {
    return;
  }

  if (
    socket.readyState === WebSocket.OPEN ||
    socket.readyState === WebSocket.CONNECTING
  ) {
    socket.close();
  }

  socket = null;
};

export default {
  connectSocket,
  getSocket,
  sendSocketMessage,
  disconnectSocket,
};
