// ==========================================
// Avatar Colors
// ==========================================

const colors = [
  "#05515A",
  "#386F73",
  "#4F7F78",
  "#5C7770",
  "#466B7A",
  "#526B82",
  "#63766B",
  "#6B7180",
];


// ==========================================
// Avatar Component
// ==========================================

function Avatar({
  name,
  size = 42,
}) {
  if (!name) return null;


  // ========================================
  // Generate Consistent Color
  // ========================================

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash =
      name.charCodeAt(i) +
      ((hash << 5) - hash);
  }

  const color =
    colors[
      Math.abs(hash) % colors.length
    ];


  // ========================================
  // Generate Initials
  // ========================================

  const initials = name
    .trim()
    .split(/\s+/)
    .map(
      (word) => word.charAt(0)
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();


  // ========================================
  // Render
  // ========================================

  return (
    <div
      title={name}
      className="
        shrink-0
        rounded-full
        flex
        items-center
        justify-center
        font-semibold
        text-white
        select-none
        border
        border-white/20
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
        hover:scale-[1.04]
      "
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        backgroundColor: color,
        fontSize:
          size <= 32
            ? "11px"
            : size <= 42
            ? "13px"
            : "15px",
      }}
    >
      {initials}
    </div>
  );
}


export default Avatar;