import React from "react";
import styles from "./Shared.module.css";

import { Input } from "reactstrap";

function Select({
  value,
  options,
  onChange,
  useObjects,
  objectTitleKey = "name",
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
      className={styles.select}
      name={name}
      style={style}
      multiple={multiple ? true : false}
      value={value}
      onChange={_onChange}
    >
      {options.map((option, index) => (
        <option key={index} disabled={option.disabled ? true : false}>
          {useObjects ? option[objectTitleKey] : option}
        </option>
      ))}
    </Input>
  );
}

export default Select;
