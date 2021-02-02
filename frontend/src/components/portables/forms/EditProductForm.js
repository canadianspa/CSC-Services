import React from "react";

import { Label, FormGroup, Input, Button } from "reactstrap";

import { PRODUCTS } from "../../../config";
import { InlineButton, MultiSelect } from "../../Shared";

function EditCustomerForm({ formState, onFormChange, onSubmit }) {
  const { title, fault, serial_numbers, in_warranty } = formState;

  return (
    <div>
      <FormGroup>
        <Label>Product</Label>
        <Input type="select" name="title" value={title} onChange={onFormChange}>
          {PRODUCTS.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup check style={{ marginBottom: "10px" }}>
        <Label check>
          <Input
            type="checkbox"
            name="in_warranty"
            checked={in_warranty}
            onChange={onFormChange}
          />{" "}
          Warranty
        </Label>
      </FormGroup>
      <FormGroup>
        <Label>Serial Numbers</Label>
        <MultiSelect
          name="serial_numbers"
          placeholder="Serial Number"
          options={serial_numbers}
          onChange={onFormChange}
          autoSuggest={false}
          useEvent={true}
          predefinedSuggestions={[]}
        />
      </FormGroup>
      <FormGroup>
        <Label>Fault Description</Label>
        <Input name="fault" value={fault} onChange={onFormChange} />
      </FormGroup>
      <InlineButton>
        <Button name="editProduct" onClick={onSubmit}>
          Update
        </Button>
      </InlineButton>
    </div>
  );
}

export default EditCustomerForm;
