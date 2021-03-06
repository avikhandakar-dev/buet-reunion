const PulseBar = ({ count, cols, gap, height }) => {
  return (
    <div className={`grid ${gap || "gap-3"} ${cols || "grid-cols-1"}`}>
      {[...Array(count || 1)].map((_, idx) => (
        <div
          key={idx}
          className={`w-full ${
            height || "h-14"
          } rounded bg-gray-300 dark:bg-gray-700 animate-pulse`}
        />
      ))}
    </div>
  );
};

export default PulseBar;
