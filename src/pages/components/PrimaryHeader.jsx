// eslint-disable-next-line react/prop-types
const PrimaryHeader = ({ children, color, className }) => {
  return (
    <h1
      className={`font-roboto py-4 text-xl sm:text-sm md:text-xl  font-medium text-[#123363] ${className}`}
      style={{ color }}
    >
      {children}
    </h1>
  );
};

export default PrimaryHeader;
