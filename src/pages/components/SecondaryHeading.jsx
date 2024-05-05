// eslint-disable-next-line react/prop-types
const SecondaryHeading = ({ children, color, className }) => {
  return (
    <h6
      className={`${className} py-1 text-[#123363] text-xl`}
      style={{ color }}
    >
      {children}
    </h6>
  );
};

export default SecondaryHeading;
