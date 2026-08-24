function JoinScreen({
  room,
  setRoom,
  joinChat,
  username,
  logout,
}) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BDD9D7] px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* ======================================
            Header
        ====================================== */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#03363D]">
            Socket Chat
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome,{" "}
            <span className="font-semibold text-[#03363D]">
              {username}
            </span>
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Enter a room to start chatting
          </p>

        </div>


        {/* ======================================
            Room Input
        ====================================== */}

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Enter Room Name"
            value={room}
            onChange={(e) =>
              setRoom(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                joinChat();
              }

            }}
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-[#03363D]
              focus:ring-2
              focus:ring-[#03363D]/10
            "
          />


          {/* Join Button */}

          <button
            onClick={joinChat}
            className="
              w-full
              bg-[#03363D]
              hover:bg-[#05515A]
              text-white
              font-semibold
              py-3
              rounded-xl
              transition-all
              duration-300
            "
          >
            Join Chat
          </button>


          {/* Logout */}

          <button
            onClick={logout}
            className="
              w-full
              border
              border-gray-300
              text-gray-600
              hover:bg-gray-50
              font-semibold
              py-3
              rounded-xl
              transition-all
              duration-300
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default JoinScreen;