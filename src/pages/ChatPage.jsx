import Sidebar from "../components/SideBar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

import { useState } from "react";


function ChatPage({
  onlineUsers,
  room,
  messages,
  username,
  messagesEndRef,
  message,
  setMessage,
  sendMessage,
  typingUser,
  highlightedMessageId,
}) {

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);


  return (
    <div
      className="
        fixed
        inset-0

        w-screen
        h-screen

        overflow-hidden

        bg-[#F7F3EC]
      "
    >

      <div
        className="
          flex

          w-full
          h-full

          overflow-hidden

          bg-[#F7F3EC]
        "
      >

        {/* ====================================
            Sidebar
        ==================================== */}

        <Sidebar
          onlineUsers={onlineUsers}
          username={username}
          room={room}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />


        {/* ====================================
            Main Chat Area
        ==================================== */}

        <main
          className="
            flex
            flex-1
            min-w-0
            h-full
            flex-col

            bg-[#F1ECE3]
          "
        >

          {/* Header */}

          <ChatHeader
            room={room}
            setSidebarOpen={setSidebarOpen}
          />


          {/* Messages */}

          <ChatMessages
            messages={messages}
            username={username}
            messagesEndRef={messagesEndRef}
            highlightedMessageId={
              highlightedMessageId
            }
          />


          {/* Input */}

          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            username={username}
            room={room}
            typingUser={typingUser}
          />

        </main>

      </div>

    </div>
  );
}


export default ChatPage;