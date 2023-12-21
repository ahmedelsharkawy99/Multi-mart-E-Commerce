const CustomInput = ({
  containerClass = "",
  icon,
  onIconClick,
  as = "input",
  ...props
}) => {
  const As = as;
  const Icon = icon;
  return (
    <div className={`form__group mb-3 ${containerClass}`}>
      <As {...props} />
      {icon && (
        <span className="position-absolute" onClick={onIconClick}>
          <Icon />
        </span>
      )}
    </div>
  );
};

export default CustomInput;
