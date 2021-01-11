import React from "react";

import { Form, Input } from "reactstrap";

function SelectForm({
  options,
  onSubmit,
  useObjects,
  optionKey,
  children,
  inputStyle,
}) {
  function onFormSubmit(event) {
    event.preventDefault();

    const { value } = event.target.elements.option;

    if (!value) {
      onSubmit(options[0]);
    } else if (useObjects) {
      var option = options.find((_option) => _option[optionKey] === value);
      onSubmit(option);
    } else {
      onSubmit(value);
    }
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Input name="option" type="select" multiple style={inputStyle}>
        {options.map((option, index) => {
          var value = useObjects ? option[optionKey] : option;
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </Input>
      {children}
    </Form>
  );
}

export default SelectForm;
