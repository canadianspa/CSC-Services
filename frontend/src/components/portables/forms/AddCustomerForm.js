import React from "react";

import { Label, FormGroup, Input } from "reactstrap";
import { PRODUCTS } from "../../../config";

function AddCustomerForm({ formState, onFormChange }) {
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
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" value={name} onChange={onFormChange} />
      </FormGroup>
    </div>
  );
}

export default AddCustomerForm;
