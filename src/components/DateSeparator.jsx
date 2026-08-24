function DateSeparator({ label }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-gray-300"></div>

      <span className="text-sm font-semibold text-gray-500 bg-[#F4F8F8] px-4">
        {label}
      </span>

      <div className="flex-1 h-px bg-gray-300"></div>
    </div>
  );
}

export default DateSeparator;