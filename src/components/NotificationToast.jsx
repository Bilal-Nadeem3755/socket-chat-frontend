import {
  Bell,
  X,
} from "lucide-react";

import { useEffect } from "react";


function NotificationToast({
  notification,
  onClose,
  onClick,
}) {

  // ==========================================
  // Auto Close Notification
  // ==========================================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        onClose(
          notification.id
        );

      }, 5000);


    return () => {
      clearTimeout(timer);
    };

  }, [
    notification.id,
    onClose,
  ]);


  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      onClick={() =>
        onClick(notification)
      }

      className="
        pointer-events-auto
        relative

        w-full

        overflow-hidden

        bg-[#F8F6F0]

        border
        border-[#DDD8C9]

        rounded-xl

        shadow-[0_8px_30px_rgba(24,43,45,0.16)]

        cursor-pointer

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-[0_12px_34px_rgba(24,43,45,0.22)]

        animate-[notificationIn_.3s_ease-out]
      "
    >

      {/* ======================================
          Small Accent Line
      ====================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-[3px]
          bg-[#6E8176]
        "
      />


      <div
        className="
          flex
          items-start
          gap-3

          px-4
          py-4
        "
      >

        {/* ====================================
            Notification Icon
        ==================================== */}

        <div
          className="
            shrink-0

            w-10
            h-10

            rounded-lg

            bg-[#E4E8DE]

            flex
            items-center
            justify-center
          "
        >

          <Bell
            size={19}
            strokeWidth={2}
            className="
              text-[#3F554B]
            "
          />

        </div>


        {/* ====================================
            Content
        ==================================== */}

        <div
          className="
            flex-1
            min-w-0
            pt-0.5
          "
        >

          {/* ==================================
              Header
          ================================== */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >

            <div className="min-w-0">

              <p
                className="
                  text-[13px]
                  font-semibold
                  text-[#263C3C]
                  truncate
                "
              >
                New message
              </p>

              <p
                className="
                  text-xs
                  font-medium
                  text-[#6E8176]
                  mt-0.5
                  truncate
                "
              >
                {notification.sender_username}
              </p>

            </div>


            {/* ==================================
                Close Button
            ================================== */}

            <button
              type="button"

              onClick={(event) => {

                event.stopPropagation();

                onClose(
                  notification.id
                );

              }}

              aria-label="Close notification"

              className="
                shrink-0

                w-7
                h-7

                rounded-full

                flex
                items-center
                justify-center

                text-[#8A918C]

                hover:bg-[#E8E5DC]
                hover:text-[#354543]

                transition-colors
                duration-200
              "
            >

              <X
                size={16}
              />

            </button>

          </div>


          {/* ==================================
              Message Preview
          ================================== */}

          <p
            className="
              mt-2

              text-[13px]
              leading-5

              text-[#4D5755]

              line-clamp-2
              break-words
            "
          >
            {notification.message}
          </p>


          {/* ==================================
              Time
          ================================== */}

          <p
            className="
              mt-2.5

              text-[10px]
              font-medium

              text-[#969B96]
            "
          >
            {notification.time}
          </p>

        </div>

      </div>


      {/* ======================================
          Bottom Progress Indicator
      ====================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0

          h-[2px]

          bg-[#6E8176]

          animate-[notificationProgress_5s_linear_forwards]
        "
      />

    </div>
  );
}


export default NotificationToast;