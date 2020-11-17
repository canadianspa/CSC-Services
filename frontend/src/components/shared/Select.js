import React from "react";
import "./Shared.css";

import { Input } from "reactstrap";

function Select({
  options,
  onChange,
  useObjects,
  objectTitleKey,
  multiple,
  name,
  style,
}) {
  function _onChange(event) {
    if (useObjects) {
      const { value, name } = event.target;

      var option = options.find((_option) => _option[objectTitleKey] === value);
      onChange(option, name);
    } else {
      onChange(event);
    }
  }

  return (
    <Input
      type="select"
      className="select"
      name={name}
      style={style}
      multiple={multiple ? true : false}
      onChange={_onChange}
    >
      {options.map((option, index) => (
        <option key={index}>{useObjects ? option[objectTitleKey] : option}</option>
      ))}
    </Input>
  );
}

export default Select;
