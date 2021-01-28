import React from "react";

import { Label, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";

import { PRODUCTS } from "../../../config";
import { InlineButton } from "../../Shared";

function AddCustomerForm({ formState, onFormChange, onSubmit }) {
  const { name, product, fault, in_warranty } = formState;

  return (
    <div>
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" value={name} onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Product</Label>
        <Input type="select" name="product" value={product} onChange={onFormChange}>
          {PRODUCTS.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Fault</Label>
        <Input name="fault" value={fault} onChange={onFormChange} />
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
      <InlineButton>
        <Button name="createCustomer" onClick={onSubmit}>
          Create
        </Button>
      </InlineButton>
    </div>
  );
}

export default AddCustomerForm;
