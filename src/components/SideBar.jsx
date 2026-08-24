import {
  X,
  Hash,
} from "lucide-react";

import Avatar from "./Avatar";


function Sidebar({
  onlineUsers,
  username,
  room,
  sidebarOpen,
  setSidebarOpen,
}) {

  const sortedUsers =
    [...onlineUsers].sort((a, b) => {

      if (a === username) return -1;
      if (b === username) return 1;

      return a.localeCompare(b);

    });


  return (
    <>
      {/* ==========================================
          Mobile Overlay
      ========================================== */}

      {sidebarOpen && (

        <div
          className="
            fixed
            inset-0
            bg-black/30
            backdrop-blur-[2px]
            z-40
            md:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}


      {/* ==========================================
          Sidebar
      ========================================== */}

      <aside
        className={`
          fixed
          md:static

          top-0
          left-0

          h-full

          w-70
          shrink-0

          bg-[#05515A]

          text-white

          flex
          flex-col

          z-50

          border-r
          border-white/15

          transform
          transition-transform
          duration-300
          ease-out

          shadow-xl
          md:shadow-none

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* ==========================================
            Header
        ========================================== */}

        <div
          className="
            px-6
            py-5

            border-b
            border-white/15

            flex
            items-center
            justify-between
          "
        >

          <div>

            <h1
              className="
                text-xl
                font-semibold
                tracking-tight
                text-white
              "
            >
              Chat
            </h1>


            <p
              className="
                text-xs
                text-[#C7DEDC]
                mt-1
              "
            >
              A quiet place to talk.
            </p>

          </div>


          {/* Mobile Close */}

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
              md:hidden

              w-9
              h-9

              rounded-lg

              flex
              items-center
              justify-center

              text-[#C7DEDC]

              hover:bg-white/10
              hover:text-white

              transition
            "
            aria-label="Close sidebar"
          >

            <X size={20} />

          </button>

        </div>


        {/* ==========================================
            Current Room
        ========================================== */}

        <div className="px-5 pt-6">

          <p
            className="
              text-[10px]

              uppercase

              tracking-[0.16em]

              text-white/90

              mb-3
            "
          >
            Current room
          </p>


          <div
            className="
              flex
              items-center
              gap-3

              px-3
              py-3

              rounded-xl

              bg-white

              border
              border-white/20

              shadow-sm

              transition

              hover:bg-[#F9FBFA]
            "
          >

            {/* Room Icon */}

            <div
              className="
                w-9
                h-9

                rounded-lg

                bg-[#DCE8E5]

                text-[#05515A]

                flex
                items-center
                justify-center

                shrink-0
              "
            >

              <Hash size={18} />

            </div>


            {/* Room Information */}

            <div className="min-w-0">

              <p
                className="
                  text-sm
                  font-semibold

                  text-[#263238]

                  truncate
                "
              >
                {room}
              </p>


              <p
                className="
                  text-[11px]

                  text-[#7C8583]

                  mt-0.5
                "
              >
                Open conversation
              </p>

            </div>

          </div>

        </div>


        {/* ==========================================
            Online Users
        ========================================== */}

        <div
          className="
            flex-1

            overflow-y-auto

            px-5
            pt-7

            scrollbar-hide
          "
        >

          {/* Section Header */}

          <div
            className="
              flex
              items-center
              justify-between

              mb-4
            "
          >

            <p
              className="
                text-[10px]

                uppercase

                tracking-[0.16em]

                text-white/90
              "
            >
              People online
            </p>


            <span
              className="
                min-w-6
                h-6

                px-2

                rounded-full

                flex
                items-center
                justify-center

                bg-white

                text-[#05515A]

                text-[11px]
                font-semibold
              "
            >
              {onlineUsers.length}
            </span>

          </div>


          {/* Users */}

          {sortedUsers.map(
            (user, index) => {

              const isCurrentUser =
                user === username;


              return (

                <div
                  key={index}
                  className={`
                    flex
                    items-center
                    justify-between

                    px-3
                    py-2.5

                    rounded-xl

                    mb-1.5

                    border

                    transition-all
                    duration-200

                    ${
                      isCurrentUser
                        ? `
                          bg-white
                          border-white/20
                          shadow-sm
                        `
                        : `
                          bg-transparent
                          border-transparent

                          hover:bg-white/10
                          hover:border-white/10
                        `
                    }
                  `}
                >

                  {/* User */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3

                      min-w-0
                    "
                  >

                    {/* Avatar */}

                    <div
                      className="
                        relative
                        shrink-0
                      "
                    >

                      <Avatar
                        name={user}
                        size={36}
                      />


                      {/* Online Dot */}

                      <span
                        className="
                          absolute

                          right-0
                          bottom-0

                          w-2.5
                          h-2.5

                          rounded-full

                          bg-[#A8C99F]

                          border-2
                          border-[#05515A]
                        "
                      />

                    </div>


                    {/* User Info */}

                    <div className="min-w-0">

                      <p
                        className={`
                          text-sm

                          font-semibold

                          truncate

                          ${
                            isCurrentUser
                              ? "text-[#263238]"
                              : "text-white"
                          }
                        `}
                      >
                        {user}
                      </p>


                      <p
                        className={`
                          text-[11px]

                          mt-0.5

                          ${
                            isCurrentUser
                              ? "text-[#71807D]"
                              : "text-[#C7DEDC]"
                          }
                        `}
                      >
                        Online
                      </p>

                    </div>

                  </div>


                  {/* YOU */}

                  {isCurrentUser && (

                    <span
                      className="
                        shrink-0

                        text-[9px]

                        tracking-wider

                        font-semibold

                        text-[#05515A]

                        bg-[#DCE8E5]

                        px-2
                        py-1

                        rounded-full
                      "
                    >
                      YOU
                    </span>

                  )}

                </div>

              );

            }
          )}

        </div>


        {/* ==========================================
            Current User Footer
        ========================================== */}

        <div
          className="
            px-5
            py-5

            border-t
            border-white/15
          "
        >

          <div
            className="
              flex
              items-center
              gap-3

              px-2
            "
          >

            {/* Avatar */}

            <div
              className="
                relative
                shrink-0
              "
            >

              <Avatar
                name={username}
                size={40}
              />


              <span
                className="
                  absolute

                  right-0
                  bottom-0

                  w-2.5
                  h-2.5

                  rounded-full

                  bg-white/90

                  border-2
                  border-[#05515A]
                "
              />

            </div>


            {/* User Information */}

            <div className="min-w-0">

              <p
                className="
                  text-sm

                  font-semibold

                  text-white

                  truncate
                "
              >
                {username}
              </p>


              <div
                className="
                  flex
                  items-center
                  gap-1.5

                  mt-1
                "
              >

                <span
                  className="
                    w-1.5
                    h-1.5

                    rounded-full

                    bg-[#A8C99F]
                  "
                />


                <p
                  className="
                    text-[11px]

                    text-white/90
                  "
                >
                  Available
                </p>

              </div>

            </div>

          </div>

        </div>

      </aside>

    </>
  );
}


export default Sidebar;