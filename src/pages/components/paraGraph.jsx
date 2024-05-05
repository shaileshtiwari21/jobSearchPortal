// eslint-disable-next-line react/prop-types
const Paragraph = ({ children, className }) => {
  return <p className={className || ""}>{children}</p>;
};

export default Paragraph;
