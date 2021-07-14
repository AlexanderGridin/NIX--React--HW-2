import styles from "./Container.module.css";

export default function Container({ children }) {
  const { container } = styles;
  return <div className={container}>{children}</div>;
}
