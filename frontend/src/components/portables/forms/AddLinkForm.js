import React from "react";

import { Label, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";

import { InlineButton } from "../../Shared";

function AddLinkForm({ modalType, formState, onFormChange, onSubmit }) {
  const { url, urlTitle } = formState;

  return (
    <div>
      <FormGroup>
        <Label>Title</Label>
        <Input
          name="urlTitle"
          placeholder="Order #P-12345678"
          value={urlTitle}
          onChange={onFormChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>URL</Label>
        <Input
          name="url"
          placeholder="https://app.veeqo.com/orders/12345678"
          value={url}
          onChange={onFormChange}
        />
      </FormGroup>
      <InlineButton>
        <Button name="addLink" onClick={onSubmit}>
          Add
        </Button>
      </InlineButton>
    </div>
  );
}

export default AddLinkForm;
