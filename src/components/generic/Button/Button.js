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
