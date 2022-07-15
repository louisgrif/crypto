import classnames from "classnames";
import "./button.scss";

const Button = ({ className, label, ...rest }) => (
  <button type="button" className={classnames("button", className)} {...rest}>
    {label}
  </button>
);

export default Button;
