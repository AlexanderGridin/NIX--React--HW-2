import PropTypes from "prop-types";
import styles from "./Input.module.css";

export default function Input(props) {
  const { id, type, name, placeholder, description } = props;
  const { textInput, description: descriptionClassName } = styles;

  return (
    <>
      <input
        className={textInput}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
      />
      {description && <div className={descriptionClassName}>{description}</div>}
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string
};
