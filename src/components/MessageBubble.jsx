import Avatar from "./Avatar";

import {
  Check,
  CheckCheck,
} from "lucide-react";

function MessageBubble({
  msg,
  username,
  highlightedMessageId,
}) {

  // ==========================================
  // System Notification
  // ==========================================

  if (msg.type === "notification") {
    return (
      <div className="flex justify-center my-5">

        <div
          className="
            px-4
            py-2
            rounded-lg
            bg-[#E8DED0]
            text-[#766F69]
            text-center
          "
        >

          <p className="text-xs">
            {msg.text}
          </p>

          <p className="text-[10px] mt-1 opacity-60">
            {msg.time}
          </p>

        </div>

      </div>
    );
  }


  const isMine =
    msg.username === username;

  const isHighlighted =
    msg.id === highlightedMessageId;


  return (
    <div
      id={`message-${msg.id}`}
      data-message-id={msg.id}
      className={`
        flex
        items-end
        gap-2.5
        mb-5
        transition-all
        duration-300

        ${
          isMine
            ? "justify-end"
            : "justify-start"
        }

        ${
          isHighlighted
            ? "scale-[1.015]"
            : ""
        }
      `}
    >

      {/* Other User Avatar */}

      {!isMine && (
        <div className="shrink-0 mb-1">

          <Avatar
            name={msg.username}
            size={32}
          />

        </div>
      )}


      {/* Message */}

      <div
        className={`
          max-w-[88%]
          sm:max-w-[75%]
          md:max-w-[65%]

          ${
            isMine
              ? "items-end"
              : "items-start"
          }

          flex
          flex-col
        `}
      >

        {/* Username */}

        {!isMine && (
          <p
            className="
              text-[11px]
              font-semibold
              text-[#746D67]
              mb-1
              ml-1
            "
          >
            {msg.username}
          </p>
        )}


        {/* Bubble */}

        <div
          className={`
            px-4
            py-3
            rounded-2xl
            shadow-[0_2px_8px_rgba(48,42,58,0.06)]
            transition-shadow
            duration-200
            hover:shadow-[0_4px_12px_rgba(48,42,58,0.09)]

            ${
              isMine
                ? `
                  bg-[#05515A]
                  text-[#FFFDF9]
                  rounded-br-md
                `
                : `
                  bg-[#FFFDF9]
                  text-[#302A3A]
                  border
                  border-[#E5DDD2]
                  rounded-bl-md
                `
            }

            ${
              isHighlighted
                ? `
                  ring-2
                  ring-[#C47A62]
                  ring-offset-2
                  ring-offset-[#F2EDE5]
                `
                : ""
            }
          `}
        >

          {/* Text */}

          <p
            className="
              text-sm
              leading-6
              whitespace-pre-wrap
              break-words
            "
          >
            {msg.message}
          </p>


          {/* Time */}

          <div
            className={`
              flex
              items-center
              gap-1.5
              mt-1.5

              ${
                isMine
                  ? "justify-end text-[#D8D0D8]"
                  : "justify-start text-[#928A83]"
              }
            `}
          >

            <span className="text-[10px]">
              {msg.time}
            </span>


            {isMine &&
              msg.status === "sent" && (
                <Check size={13} />
              )}


            {isMine &&
              msg.status === "delivered" && (
                <CheckCheck
                  size={13}
                />
              )}


            {isMine &&
              msg.status === "read" && (
                <CheckCheck
                  size={13}
                  className="text-[#A8B5A2]"
                />
              )}

          </div>

        </div>

      </div>


      {/* Own Avatar */}

      {isMine && (
        <div className="shrink-0 mb-1">

          <Avatar
            name={msg.username}
            size={32}
          />

        </div>
      )}

    </div>
  );
}

export default MessageBubble;