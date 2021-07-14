import styles from "./Input.module.css";

export default function Input(props) {
  let { id, type, name, placeholder, description, defaultValue } = props;

  return (
    <>
      <input
        className={styles.textInput}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={defaultValue}
      />
      {description && <div className={styles.description}>{description}</div>}
    </>
  );
}
