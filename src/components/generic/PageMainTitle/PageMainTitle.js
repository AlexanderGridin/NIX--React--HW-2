import PropTypes from "prop-types";

export default function PageMainTitle({ text }) {
  return <h1 style={{ textAlign: "center" }}>{text}</h1>;
}

PageMainTitle.propTypes = {
  text: PropTypes.string
};
