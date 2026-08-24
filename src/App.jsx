import {
  useState,
  useEffect,
  useRef,
} from "react";

import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import JoinScreen from "./components/JoinScreen";
import ChatPage from "./pages/ChatPage";
import NotificationContainer from "./components/NotificationContainer";

import useSocket from "./hooks/useSocket";

import {
  connectSocket,
  sendSocketMessage,
  disconnectSocket,
} from "./socket/socket";

import {
  getAccessToken,
  getStoredUser,
  logoutUser,
} from "./services/auth";


function App() {

  // ==========================================
  // Authentication State
  // ==========================================

  const [user, setUser] =
    useState(() => getStoredUser());

  const [authScreen, setAuthScreen] =
    useState("login");


  // ==========================================
  // WebSocket State
  // ==========================================

  const [socketConnection, setSocketConnection] =
    useState(null);


  // ==========================================
  // Chat State
  // ==========================================

  const [typingUser, setTypingUser] =
    useState("");

  const [room, setRoom] =
    useState("");

  const [onlineUsers, setOnlineUsers] =
    useState([]);

  const [joined, setJoined] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [unreadMessages, setUnreadMessages] =
    useState({
      count: 0,
      messageIds: [],
    });

  const [notifications, setNotifications] =
    useState([]);

  const [
    highlightedMessageId,
    setHighlightedMessageId,
  ] = useState(null);

  const messagesEndRef =
    useRef(null);


  // ==========================================
  // WebSocket Event Handling
  // ==========================================

  useSocket({
    socket: socketConnection,

    setMessages,
    setOnlineUsers,
    setTypingUser,
    setUnreadMessages,
    setNotifications,

    username:
      user?.username || "",
  });


  // ==========================================
  // Auto Scroll
  // ==========================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);


  // ==========================================
  // Login Success
  // ==========================================

  const handleLoginSuccess = (
    loggedInUser
  ) => {

    setUser(loggedInUser);

    setAuthScreen("login");

  };


  // ==========================================
  // Register Success
  // ==========================================

  const handleRegisterSuccess = (
    registeredUser
  ) => {

    setUser(registeredUser);

    setAuthScreen("login");

  };


  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {

    disconnectSocket();

    setSocketConnection(null);

    logoutUser();

    setUser(null);

    setJoined(false);

    setRoom("");

    setMessages([]);

    setOnlineUsers([]);

    setTypingUser("");

    setNotifications([]);

    setUnreadMessages({
      count: 0,
      messageIds: [],
    });

    setHighlightedMessageId(null);

    setAuthScreen("login");

  };


  // ==========================================
  // Send Message
  // ==========================================

  const sendMessage = () => {

    const text =
      message.trim();

    if (!text) {
      return;
    }


    const success =
      sendSocketMessage({
        type: "message",
        message: text,
      });


    if (!success) {

      console.error(
        " Message could not be sent"
      );

      return;
    }


    setMessage("");


    // ========================================
    // Stop Typing
    // ========================================

    sendSocketMessage({
      type: "stop_typing",
    });

  };


  // ==========================================
  // Join Chat
  // ==========================================

  const joinChat = () => {

    if (!room.trim()) {

      console.error(
        " Room name is required"
      );

      return;
    }


    if (!user) {

      console.error(
        " User is not authenticated"
      );

      return;
    }


    const token =
      getAccessToken();


    if (!token) {

      console.error(
        " Access token not found"
      );

      handleLogout();

      return;
    }


    // ========================================
    // Reset Old State
    // ========================================

    setMessages([]);

    setOnlineUsers([]);

    setTypingUser("");

    setUnreadMessages({
      count: 0,
      messageIds: [],
    });

    setNotifications([]);

    setHighlightedMessageId(null);


    // ========================================
    // Connect WebSocket
    // ========================================

    const socket =
      connectSocket(
        room.trim(),
        token
      );


    if (!socket) {

      console.error(
        " Failed to create WebSocket"
      );

      return;
    }


    // ========================================
    // Store Socket In React State
    // ========================================

    setSocketConnection(socket);

    setJoined(true);

  };


  // ==========================================
  // Disconnect On App Unmount
  // ==========================================

  useEffect(() => {

    return () => {

      disconnectSocket();

    };

  }, []);


  // ==========================================
  // Remove Notification
  // ==========================================

  const removeNotification = (
    notificationId
  ) => {

    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.id !==
          notificationId
      )
    );

  };


  // ==========================================
  // Notification Click
  // ==========================================

  const handleNotificationClick = (
    notification
  ) => {

    const messageId =
      notification.message_id;


    if (!messageId) {
      return;
    }


    removeNotification(
      notification.id
    );


    setHighlightedMessageId(
      messageId
    );


    setTimeout(() => {

      const messageElement =
        document.getElementById(
          `message-${messageId}`
        );


      if (!messageElement) {

        console.warn(
          " Message element not found:",
          messageId
        );

        return;
      }


      messageElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });


      setTimeout(() => {

        setHighlightedMessageId(
          null
        );

      }, 2000);

    }, 100);

  };


  // ==========================================
  // Authentication Screen
  // ==========================================

  if (!user) {

    if (
      authScreen ===
      "register"
    ) {

      return (
        <RegisterScreen
          onRegisterSuccess={
            handleRegisterSuccess
          }

          onShowLogin={() =>
            setAuthScreen("login")
          }
        />
      );

    }


    return (
      <LoginScreen
        onLoginSuccess={
          handleLoginSuccess
        }

        onShowRegister={() =>
          setAuthScreen("register")
        }
      />
    );

  }


  // ==========================================
  // Join Screen
  // ==========================================

  if (!joined) {

    return (
      <JoinScreen
        username={user.username}
        room={room}
        setRoom={setRoom}
        joinChat={joinChat}
        logout={handleLogout}
      />
    );

  }


  // ==========================================
  // Chat Page
  // ==========================================

  return (
    <>
      <ChatPage
        onlineUsers={onlineUsers}
        room={room}
        messages={messages}
        username={user.username}

        messagesEndRef={
          messagesEndRef
        }

        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}

        typingUser={typingUser}

        highlightedMessageId={
          highlightedMessageId
        }
      />


      {/* ======================================
          Notification Container
      ====================================== */}

      <NotificationContainer
        notifications={
          notifications
        }

        removeNotification={
          removeNotification
        }

        onNotificationClick={
          handleNotificationClick
        }
      />
    </>
  );
}


export default App;