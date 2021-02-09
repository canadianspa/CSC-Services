import React from "react";
import styles from "./Shared.module.css";

import { Input } from "reactstrap";

function Select({
  value,
  options,
  onChange,
  useObjects,
  useEvent,
  objectTitleKey = "name",
  multiple,
  name,
  style,
}) {
  function onInputChange(event) {
    const { value, name } = event.target;

    var option = value;

    if (useObjects) {
      option = options.find((option) => {
        return option[objectTitleKey] === value;
      });
    }

    if (useEvent) {
      var syntheticEvent = {
        target: {
          name: name,
          value: option,
        },
      };

      onChange(syntheticEvent);
    } else {
      onChange(option, name);
    }
  }

  return (
    <Input
      type="select"
      className={styles.select}
      name={name}
      style={style}
      multiple={multiple}
      value={value}
      onChange={onInputChange}
    >
      {options.map((option, index) => (
        <option key={index} disabled={option.disabled}>
          {useObjects ? option[objectTitleKey] : option}
        </option>
      ))}
    </Input>
  );
}

export default Select;
