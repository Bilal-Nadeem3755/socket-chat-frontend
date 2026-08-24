import {
  useEffect,
  useRef,
} from "react";

import MessageBubble from "./MessageBubble";

import {
  sendSocketMessage,
} from "../socket/socket";


function ChatMessages({
  messages,
  username,
  messagesEndRef,
  highlightedMessageId,
}) {

  const observerRef = useRef(null);


  useEffect(() => {

    observerRef.current =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            const messageId =
              entry.target.dataset.messageId;


            if (!messageId) {
              return;
            }


            const message =
              messages.find(
                (msg) =>
                  String(msg.id) ===
                  String(messageId)
              );


            if (!message) {
              return;
            }


            if (
              message.username ===
              username
            ) {
              return;
            }


            if (
              message.status ===
              "read"
            ) {
              return;
            }


            sendSocketMessage({
              type: "message_read",
              message_id: messageId,
            });

          });

        },
        {
          threshold: 0.5,
        }
      );


    const messageElements =
      document.querySelectorAll(
        "[data-message-id]"
      );


    messageElements.forEach(
      (element) => {
        observerRef.current.observe(
          element
        );
      }
    );


    return () => {

      observerRef.current?.disconnect();

    };

  }, [
    messages,
    username,
  ]);


  return (
    <main
      className="
        flex-1
        overflow-y-auto
        bg-[#F2EDE5]
        px-3
        py-5
        sm:px-6
        md:px-8
      "
    >

      <div className="max-w-4xl mx-auto">

        {messages.map(
          (msg, index) => (

            <MessageBubble
              key={
                msg.id || index
              }

              msg={msg}

              username={
                username
              }

              highlightedMessageId={
                highlightedMessageId
              }
            />

          )
        )}

        <div
          ref={messagesEndRef}
        />

      </div>

    </main>
  );
}


export default ChatMessages;