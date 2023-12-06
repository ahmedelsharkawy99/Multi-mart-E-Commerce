const CustomInput = ({
  containerClass = "",
  icon,
  onIconClick,
  as = "input",
  ...props
}) => {
  const As = as;
  return (
    <div className={`form__group mb-3 ${containerClass}`}>
      <As {...props} />
      {icon && (
        <span className="position-absolute" onClick={onIconClick}>
          <i className={icon}></i>
        </span>
      )}
    </div>
  );
};

export default CustomInput;
