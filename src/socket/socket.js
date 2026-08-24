let socket = null;


// ==========================================
// Connect WebSocket
// ==========================================

export const connectSocket = (
  room,
  token
) => {

  if (!room || !token) {

    console.error(
      "❌ Room or token is missing"
    );

    return null;
  }


  // ========================================
  // Close existing connection
  // ========================================

  if (socket) {

    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {

      socket.close();

    }

    socket = null;
  }


  // ========================================
  // WebSocket URL
  // ========================================

  const wsUrl =
    `ws://127.0.0.1:8000/ws/${encodeURIComponent(room)}` +
    `?token=${encodeURIComponent(token)}`;


  // ========================================
  // Create WebSocket
  // ========================================

  socket = new WebSocket(wsUrl);


  // ========================================
  // Connection Open
  // ========================================

  socket.onopen = () => {
    // WebSocket connected
  };


  // ========================================
  // Connection Error
  // ========================================

  socket.onerror = (error) => {

    console.error(
      "❌ WebSocket Error:",
      error
    );

  };


  // ========================================
  // Connection Closed
  // ========================================

  socket.onclose = (event) => {
    // WebSocket closed
  };


  return socket;
};


// ==========================================
// Get Current Socket
// ==========================================

export const getSocket = () => {

  return socket;

};


// ==========================================
// Send WebSocket Message
// ==========================================

export const sendSocketMessage = (
  data
) => {

  if (!socket) {

    console.error(
      "❌ WebSocket is not initialized"
    );

    return false;
  }


  if (
    socket.readyState !==
    WebSocket.OPEN
  ) {

    console.error(
      "❌ WebSocket is not connected"
    );

    return false;
  }


  try {

    socket.send(
      JSON.stringify(data)
    );

    return true;

  } catch (error) {

    console.error(
      "❌ Failed to send WebSocket message:",
      error
    );

    return false;

  }

};


// ==========================================
// Disconnect WebSocket
// ==========================================

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


// ==========================================
// Default Export
// ==========================================

export default {

  connectSocket,

  getSocket,

  sendSocketMessage,

  disconnectSocket,

};