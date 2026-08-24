import { useEffect } from "react";

import {
  sendSocketMessage,
} from "../socket/socket";


function useSocket({
  socket,

  setMessages,
  setOnlineUsers,
  setTypingUser,
  setUnreadMessages,
  setNotifications,

  username,
}) {

  useEffect(() => {

    // ==========================================
    // No WebSocket
    // ==========================================

    if (!socket) {
      return;
    }


    // ==========================================
    // WebSocket Connected
    // ==========================================

    const handleOpen = () => {
      // Connection established
    };


    // ==========================================
    // WebSocket Message
    // ==========================================

    const handleMessage = (event) => {

      try {

        const data =
          JSON.parse(event.data);


        // ==========================================
        // User Online
        // ==========================================

        if (
          data.type ===
          "user_online"
        ) {

          setOnlineUsers((prev) => {

            if (
              prev.includes(
                data.username
              )
            ) {
              return prev;
            }

            return [
              ...prev,
              data.username,
            ];

          });

          return;
        }


        // ==========================================
        // User Offline
        // ==========================================

        if (
          data.type ===
          "user_offline"
        ) {

          setOnlineUsers((prev) =>
            prev.filter(
              (user) =>
                user !==
                data.username
            )
          );

          return;
        }


        // ==========================================
        // Message History
        // ==========================================

        if (
          data.type ===
          "message_history"
        ) {

          const message = {

            id:
              data.id,

            sender_id:
              data.sender_id,

            username:
              data.username,

            room_id:
              data.room_id,

            message:
              data.message,

            status:
              data.status ||
              "sent",

            created_at:
              data.created_at,

            time:
              data.created_at
                ? new Date(
                    data.created_at
                  ).toLocaleTimeString(
                    [],
                    {
                      hour:
                        "2-digit",

                      minute:
                        "2-digit",
                    }
                  )
                : "",

          };


          setMessages((prev) => {

            if (
              prev.some(
                (msg) =>
                  msg.id ===
                  message.id
              )
            ) {
              return prev;
            }

            return [
              ...prev,
              message,
            ];

          });

          return;
        }


        // ==========================================
        // Live Message
        // ==========================================

        if (
          data.type ===
          "message"
        ) {

          const message = {

            id:
              data.id,

            sender_id:
              data.sender_id,

            username:
              data.username,

            room_id:
              data.room_id,

            message:
              data.message,

            status:
              data.status ||
              "sent",

            created_at:
              data.created_at,

            time:
              data.created_at
                ? new Date(
                    data.created_at
                  ).toLocaleTimeString(
                    [],
                    {
                      hour:
                        "2-digit",

                      minute:
                        "2-digit",
                    }
                  )
                : new Date().toLocaleTimeString(
                    [],
                    {
                      hour:
                        "2-digit",

                      minute:
                        "2-digit",
                    }
                  ),

          };


          setMessages((prev) => {

            if (
              prev.some(
                (msg) =>
                  msg.id ===
                  message.id
              )
            ) {
              return prev;
            }

            return [
              ...prev,
              message,
            ];

          });


          // ========================================
          // Delivery Acknowledgement
          // ========================================

          const currentUserId =
            getCurrentUserId();


          if (
            data.sender_id !==
              undefined &&

            data.sender_id !==
              null &&

            String(
              data.sender_id
            ) !==
            String(
              currentUserId
            )
          ) {

            sendSocketMessage({

              type:
                "message_delivered",

              message_id:
                data.id,

            });

          }

          return;
        }


        // ==========================================
        // Message Delivered
        // ==========================================

        if (
          data.type ===
          "message_delivered"
        ) {

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id ===
              data.message_id
                ? {
                    ...msg,

                    status:
                      msg.status ===
                      "read"
                        ? "read"
                        : "delivered",
                  }
                : msg
            )
          );

          return;
        }


        // ==========================================
        // Message Read
        // ==========================================

        if (
          data.type ===
          "message_read"
        ) {

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id ===
              data.message_id
                ? {
                    ...msg,

                    status:
                      "read",
                  }
                : msg
            )
          );

          return;
        }


        // ==========================================
        // Unread Messages
        // ==========================================

        if (
          data.type ===
          "unread_messages"
        ) {

          setUnreadMessages({

            count:
              data.count ||
              0,

            messageIds:
              data.message_ids ||
              [],

          });

          return;
        }


        // ==========================================
        // New Message Notification
        // ==========================================

        if (
          data.type ===
          "new_message_notification"
        ) {

          // ========================================
          // Get Current User ID
          // ========================================

          const currentUserId =
            getCurrentUserId();


          // ========================================
          // Ignore Own Message Notification
          // ========================================

          if (
            String(
              data.sender_id
            ) ===
            String(
              currentUserId
            )
          ) {
            return;
          }


          // ========================================
          // Create Notification
          // ========================================

          const notification = {

            id:
              data.message_id,

            message_id:
              data.message_id,

            sender_id:
              data.sender_id,

            sender_username:
              data.sender_username,

            message:
              data.message,

            room_id:
              data.room_id,

            time:
              new Date().toLocaleTimeString(
                [],
                {
                  hour:
                    "2-digit",

                  minute:
                    "2-digit",
                }
              ),

          };


          // ========================================
          // Update Notification State
          // ========================================

          setNotifications((prev) => {

            if (
              prev.some(
                (item) =>
                  item.id ===
                  notification.id
              )
            ) {
              return prev;
            }


            return [
              ...prev,
              notification,
            ];

          });


          // ========================================
          // Update Unread Messages
          // ========================================

          setUnreadMessages((prev) => {

            const currentIds =
              prev?.messageIds ||
              [];


            if (
              currentIds.includes(
                data.message_id
              )
            ) {
              return prev;
            }


            return {

              count:
                (prev?.count || 0) +
                1,

              messageIds: [
                ...currentIds,
                data.message_id,
              ],

            };

          });


          return;
        }


        // ==========================================
        // Typing
        // ==========================================

        if (
          data.type ===
          "user_typing"
        ) {

          if (
            data.username !==
            username
          ) {

            setTypingUser(
              `${data.username} is typing...`
            );

          }

          return;
        }


        // ==========================================
        // Stop Typing
        // ==========================================

        if (
          data.type ===
          "user_stop_typing"
        ) {

          setTypingUser("");

          return;
        }

      } catch (error) {

        console.error(
          "Failed to parse WebSocket message:",
          error
        );

      }

    };


    // ==========================================
    // Connection Error
    // ==========================================

    const handleError = (
      error
    ) => {

      console.error(
        "WebSocket Error:",
        error
      );

    };


    // ==========================================
    // Connection Closed
    // ==========================================

    const handleClose = () => {
      // WebSocket closed
    };


    // ==========================================
    // Add Event Listeners
    // ==========================================

    socket.addEventListener(
      "open",
      handleOpen
    );

    socket.addEventListener(
      "message",
      handleMessage
    );

    socket.addEventListener(
      "error",
      handleError
    );

    socket.addEventListener(
      "close",
      handleClose
    );


    // ==========================================
    // Handle Already Open Socket
    // ==========================================

    if (
      socket.readyState ===
      WebSocket.OPEN
    ) {

      handleOpen();

    }


    // ==========================================
    // Cleanup
    // ==========================================

    return () => {

      socket.removeEventListener(
        "open",
        handleOpen
      );

      socket.removeEventListener(
        "message",
        handleMessage
      );

      socket.removeEventListener(
        "error",
        handleError
      );

      socket.removeEventListener(
        "close",
        handleClose
      );

    };

  }, [
    socket,
    setMessages,
    setOnlineUsers,
    setTypingUser,
    setUnreadMessages,
    setNotifications,
    username,
  ]);
}


// ==========================================
// Current User ID
// ==========================================

function getCurrentUserId() {

  return (
    localStorage.getItem(
      "user_id"
    ) || ""
  );

}


export default useSocket;