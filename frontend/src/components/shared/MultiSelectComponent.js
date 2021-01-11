import React, { useState } from "react";
import "./Shared.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, InputGroup, InputGroupAddon, Button } from "reactstrap";

function MultiSelect({ name, options, onChange }) {
  const [input, setInput] = useState("");

  function onInputChange(event) {
    const { value } = event.target;
    setInput(value);
  }

  function onAddClick() {
    if (input !== "") {
      var value = [...options, input];
      onChange(value, name);
      setInput("");
    }
  }

  function onDeleteClick(event) {
    const { id } = event.currentTarget;

    var value = options.filter((option, index) => index !== parseInt(id));
    onChange(value, name);
  }

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="multiselect-option">
          <span>{option}</span>
          <button id={index} onClick={onDeleteClick}>
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
      ))}
      <InputGroup>
        <Input type="text" value={input} onChange={onInputChange} />
        <InputGroupAddon addonType="append">
          <Button onClick={onAddClick}>Add</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export default MultiSelect;
