import PropTypes from "prop-types";
import styles from "./Input.module.css";

export default function Input(props) {
  let { id, type, name, placeholder, description } = props;

  return (
    <>
      <input
        className={styles.textInput}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
      />
      {description && <div className={styles.description}>{description}</div>}
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
