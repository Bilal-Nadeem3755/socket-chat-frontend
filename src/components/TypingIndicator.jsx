function TypingIndicator({
  typingUser,
}) {
  if (!typingUser) {
    return null;
  }

  return (
    <div className="px-1">

      <div
        className="
          inline-flex
          items-center
          gap-2
          text-[#827A74]
        "
      >

        <span className="text-[11px]">
          {typingUser}
        </span>

        <div className="flex gap-1">

          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>

        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;