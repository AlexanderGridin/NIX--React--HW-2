import PropTypes from "prop-types";

export default function Form({
  className,
  action,
  method,
  onSubmit,
  children
}) {
  return (
    <form
      className={className}
      action={action}
      method={method}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

Form.propTypes = {
  className: PropTypes.string,
  action: PropTypes.string,
  method: PropTypes.string,
  onSubmit: PropTypes.func
};
