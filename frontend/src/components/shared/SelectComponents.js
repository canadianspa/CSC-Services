import React, { useEffect } from "react";
import styles from "./Shared.module.css";

import { Input } from "reactstrap";

function Select({
  options,
  onChange,
  useObjects,
  useEvent,
  objectTitleKey = "name",
  multiple,
  name,
  style,
}) {
  useEffect(() => {
    // On render
    // => calls onChange with intial value
    handleChange(options[0]);

    // eslint-disable-next-line
  }, []);

  function onInputChange(event) {
    const { value } = event.target;

    var option = value;

    if (useObjects) {
      option = options.find((option) => {
        return option[objectTitleKey] === value;
      });
    }

    handleChange(option);
  }

  function handleChange(value) {
    if (useEvent) {
      var syntheticEvent = {
        target: {
          name: name,
          value: value,
        },
      };

      onChange(syntheticEvent);
    } else {
      onChange(value, name);
    }
  }

  return (
    <Input
      type="select"
      className={styles.select}
      style={style}
      multiple={multiple}
      onChange={onInputChange}
    >
      {options.map((option, index) => {
        var value = useObjects ? option[objectTitleKey] : option;

        return (
          <option key={index} disabled={option.disabled} value={value}>
            {value}
          </option>
        );
      })}
    </Input>
  );
}

export default Select;
