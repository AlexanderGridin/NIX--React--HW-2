import PropTypes from "prop-types";
import styles from "./Image.module.css";

export default function Image({ src, alt, onLoad }) {
  return <img className={styles.image} src={src} alt={alt} onLoad={onLoad} />;
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onLoad: PropTypes.func
};
