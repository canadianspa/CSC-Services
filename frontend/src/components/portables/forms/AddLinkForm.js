import React from "react";

import { Label, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";

import { InlineButton } from "../../Shared";

function AddLinkForm({ modalType, formState, onFormChange, onSubmit }) {
  const { url, urlType, urlTypes } = formState;

  var title, placeholder;

  if (urlType === "Freshdesk Ticket") {
    title = "Freshdesk Ticket URL";
    placeholder = "https://support.canadianspacompany.com/a/tickets/123456";
  } else {
    title = "Veeqo Order URL";
    placeholder = "https://app.veeqo.com/orders/12345678";
  }

  return (
    <div>
      <FormGroup>
        <Label>URL Type</Label>
        <Input type="select" name="urlType" value={urlType} onChange={onFormChange}>
          {urlTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>{title}</Label>
        <Input
          name="url"
          placeholder={placeholder}
          value={url}
          onChange={onFormChange}
        />
      </FormGroup>
      <InlineButton>
        <Button name={modalType} onClick={onSubmit}>
          Add
        </Button>
      </InlineButton>
    </div>
  );
}

export default AddLinkForm;
