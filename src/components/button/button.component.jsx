import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({
  children,
  buttonType,
  as: Component = "button",
  ...otherProps
}) => {
  return (
    <Component
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </Component>
  );
};

export default Button;
