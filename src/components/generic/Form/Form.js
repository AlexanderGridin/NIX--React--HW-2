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
