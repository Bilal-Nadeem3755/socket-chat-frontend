import {
  useState,
  useEffect,
  useRef,
} from "react";

import TypingIndicator from "./TypingIndicator";

import {
  SendHorizontal,
  Smile,
} from "lucide-react";

import EmojiPicker from "emoji-picker-react";

import {
  sendSocketMessage,
} from "../socket/socket";

function ChatInput({
  message,
  setMessage,
  sendMessage,
  username,
  room,
  typingUser,
}) {
  const typingTimeout = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const pickerRef = useRef(null);

  const inputRef = useRef(null);


  // ==========================================
  // Resize Textarea
  // ==========================================

  const resizeTextarea = () => {

    if (!inputRef.current) {
      return;
    }

    inputRef.current.style.height = "auto";

    inputRef.current.style.height =
      Math.min(
        inputRef.current.scrollHeight,
        140
      ) + "px";
  };


  useEffect(() => {
    resizeTextarea();
  }, [message]);


  // ==========================================
  // Emoji
  // ==========================================

  const handleEmojiClick = (emojiData) => {

    const newMessage =
      message + emojiData.emoji;

    setMessage(newMessage);

    setTimeout(() => {

      inputRef.current?.focus();

      if (inputRef.current) {

        const end =
          inputRef.current.value.length;

        inputRef.current.setSelectionRange(
          end,
          end
        );

      }

      resizeTextarea();

    }, 0);
  };


  // ==========================================
  // Outside Click
  // ==========================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        pickerRef.current &&
        !pickerRef.current.contains(
          event.target
        )
      ) {
        setShowEmojiPicker(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // ==========================================
  // Escape
  // ==========================================

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {
        setShowEmojiPicker(false);
      }

    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, []);


  // ==========================================
  // Cleanup
  // ==========================================

  useEffect(() => {

    return () => {

      if (typingTimeout.current) {

        clearTimeout(
          typingTimeout.current
        );

      }

    };

  }, []);


  // ==========================================
  // Typing
  // ==========================================

  const handleTyping = (value) => {

    setMessage(value);

    sendSocketMessage({
      type: "typing",
    });

    if (typingTimeout.current) {

      clearTimeout(
        typingTimeout.current
      );

    }

    typingTimeout.current =
      setTimeout(() => {

        sendSocketMessage({
          type: "stop_typing",
        });

      }, 1000);

    resizeTextarea();
  };


  return (
    <footer
      className="
        relative
        bg-[#F7F3EC]
        border-t
        border-[#E2D8CB]
        px-3
        py-3
        sm:px-5
        sm:py-4
      "
    >

      {/* Typing */}

      <div className="h-6 mb-1">

        <TypingIndicator
          typingUser={typingUser}
        />

      </div>


      <div className="relative max-w-4xl mx-auto">

        {/* Emoji Picker */}

        {showEmojiPicker && (
          <div
            ref={pickerRef}
            className="
              absolute
              bottom-14
              left-0
              z-50
              origin-bottom-left
              max-sm:scale-90
            "
          >

            <EmojiPicker
              onEmojiClick={
                handleEmojiClick
              }
              theme="light"
            />

          </div>
        )}


        <div
          className="
            flex
            items-end
            gap-2
            bg-[#FFFDF9]
            border
            border-[#DED4C8]
            rounded-2xl
            p-1.5
            shadow-[0_2px_8px_rgba(48,42,58,0.05)]
            focus-within:border-[#A8B5A2]
            focus-within:shadow-[0_3px_12px_rgba(48,42,58,0.08)]
            transition-all
          "
        >

          {/* Emoji */}

          <button
            type="button"
            onClick={() =>
              setShowEmojiPicker(
                (prev) => !prev
              )
            }
            className="
              shrink-0
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              text-[#766F69]
              hover:text-[#302A3A]
              hover:bg-[#F2EDE5]
              transition
            "
            aria-label="Open emoji picker"
          >

            <Smile size={20} />

          </button>


          {/* Input */}

          <textarea
            ref={inputRef}
            rows={1}
            value={message}
            placeholder="Write a message..."
            className="
              flex-1
              resize-none
              overflow-y-auto
              bg-transparent
              border-none
              outline-none
              px-2
              py-2
              text-sm
              text-[#302A3A]
              placeholder:text-[#AAA19A]
              leading-6
              max-h-35
            "
            onChange={(e) => {
              handleTyping(
                e.target.value
              );
            }}
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                sendMessage();

                setTimeout(() => {
                  resizeTextarea();
                }, 0);

              }

            }}
          />


          {/* Send */}

          <button
            type="button"
            onClick={sendMessage}
            disabled={!message.trim()}
            className={`
              shrink-0
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              transition-all
              
              ${
                message.trim()
                  ? `
                    bg-[#03363D]
                    text-white
                    hover:bg-[#05515A]
                    active:scale-95
                  `
                  : `
                    bg-[#E8DED0]
                    text-[#AAA19A]
                    cursor-not-allowed
                  `
              }
            `}
            aria-label="Send message"
          >

            <SendHorizontal size={19} />

          </button>

        </div>

        <p
          className="
            hidden
            sm:block
            text-[10px]
            text-[#9A928B]
            mt-2
            ml-2
          "
        >
          Enter to send · Shift + Enter for a new line
        </p>

      </div>

    </footer>
  );
}

export default ChatInput;