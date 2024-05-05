// Disable ESLint rule for prop types validation
/* eslint-disable react/prop-types */
const ButtonComp = ({
  fontSize = "md",
  children,
  onClick,
  className,
  ButtonType,
  Type,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={Type}
      onClick={onClick}
      className={`min-h-[36px] min-w-max px-4 rounded-lg ${
        fontSize ? `text-${fontSize}` : `text-sm `
      } font-medium ${
        ButtonType === "filled" ? "bg-primary text-white" : "border-2"
      } hover:shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonComp;
