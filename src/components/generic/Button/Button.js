import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default function Button(props) {
  let { typeClassName, type, text, onClick } = props;
  return (
    <button
      className={`${styles.button} ${styles[typeClassName]}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  typeClassName: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};
