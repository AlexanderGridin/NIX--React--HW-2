import PropTypes from "prop-types";
import styles from "./SearchForm.module.css";

import Form from "../generic/Form/Form";
import Input from "../generic/Input/Input";
import Button from "../generic/Button/Button";

export default function SearchForm({ inputLastValue, onSubmit }) {
  const { form, formItem } = styles;

  return (
    <Form className={form} action="#" method="POST" onSubmit={onSubmit}>
      <FormItem className={formItem}>
        <Input
          placeholder={
            inputLastValue
              ? `Last searched category: ${inputLastValue}`
              : "Type images category"
          }
          description="Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music"
        />
      </FormItem>
      <FormItem className={formItem}>
        <Button type="submit" typeClassName="primary" text="Find images" />
      </FormItem>
    </Form>
  );
}

SearchForm.propTypes = {
  inputLastValue: PropTypes.string,
  onSubmit: PropTypes.func
};

function FormItem({ className, children }) {
  return <div className={className}>{children}</div>;
}

FormItem.propTypes = {
  className: PropTypes.string
};
