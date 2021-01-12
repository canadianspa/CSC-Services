import React, { useState } from "react";
import "./Shared.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autosuggest from "react-autosuggest";

function MultiSelect({ options, onChange, name, predefinedSuggestions }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function onAddClick(suggestion) {
    if (input !== "") {
      var value = suggestion ? [...options, suggestion] : [...options, input];
      onChange(value, name);
      setInput("");
    }
  }

  function onDeleteClick(event) {
    const { id } = event.currentTarget;

    var value = options.filter((option, index) => {
      return index !== parseInt(id);
    });

    onChange(value, name);
  }

  function onSuggestionsFetchRequested({ value }) {
    setSuggestions(
      predefinedSuggestions.filter((suggestion) => {
        return suggestion.toLowerCase().includes(value);
      })
    );
  }

  const onSuggestionsClearRequested = () => setSuggestions([]);
  const onSuggestionSelected = (event, { suggestion }) => onAddClick(suggestion);
  const getSuggestionValue = (value) => value;
  const renderSuggestion = (suggestion) => suggestion;

  const inputProps = {
    placeholder: "Email",
    className: "form-control",
    value: input,
    onChange: (event, { newValue }) => {
      setInput(newValue);
    },
    onKeyPress: (event) => {
      if (event.key === "Enter") {
        onAddClick(input);
      }
    },
  };

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
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
}

export default MultiSelect;
