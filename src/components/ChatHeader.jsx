import {
  Menu,
  Circle,
} from "lucide-react";

function ChatHeader({
  room,
  setSidebarOpen,
}) {
  return (
    <header
      className="
        h-[72px]
        shrink-0
        bg-[#05515A]
        border-b
        border-[#E2D8CB]
        flex
        items-center
        justify-between
        px-4
        sm:px-6
        md:px-8
      "
    >

      {/* Left */}

      <div className="flex items-center gap-3">

        {/* Mobile Menu */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="
  md:hidden

  w-10
  h-10

  rounded-xl

  flex
  items-center
  justify-center

  text-[#05515A]

  bg-[#DCE8E5]

  hover:bg-[#C8DDDA]
  hover:scale-105

  active:scale-95

  transition-all
  duration-200
"
aria-label="Open sidebar"
>
          <Menu size={22} />
        </button>

        {/* Room Icon */}

        <div
          className="
            hidden
            sm:flex
            w-10
            h-10
            rounded-xl
            bg-[#E8DED0]
            items-center
            justify-center
            text-[#302A3A]
            font-semibold
          "
        >
          #
        </div>

        <div>

          <h1
            className="
              text-[17px]
              sm:text-lg
              font-semibold
              text-white/90
              tracking-[-0.01em]
            "
          >
            {room}
          </h1>

          <div className="flex items-center gap-1.5 mt-0.5">

            <Circle
              size={7}
              fill="#7D9877"
              className="text-[#7D9877]"
            />

            <p className="text-xs text-white/90">
              Live conversation
            </p>

          </div>

        </div>

      </div>


      {/* Right */}

      <div className="hidden sm:flex items-center gap-2">

        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[#7D9877]
          "
        />

        <span
          className="
            text-xs
            font-medium
            text-white/90
          "
        >
          Connected
        </span>

      </div>

    </header>
  );
}

export default ChatHeader;