import React from "react";

import { Label, FormGroup, Input, Button } from "reactstrap";

import { PRODUCTS } from "../../../config";
import { InlineButton, MultiSelect } from "../../Shared";

function CustomerForm({ modalType, formState, onFormChange, onSubmit }) {
  const { name, address, phone, title, fault, serial_numbers, warranty } = formState;

  return (
    <div>
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" value={name} onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input
          type="textarea"
          name="address"
          value={address}
          onChange={onFormChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone</Label>
        <Input name="phone" value={phone} onChange={onFormChange} />
      </FormGroup>
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
            name="warranty"
            checked={warranty}
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
        <Input type="textarea" name="fault" value={fault} onChange={onFormChange} />
      </FormGroup>
      <InlineButton>
        <Button name={modalType} onClick={onSubmit}>
          {modalType === "addCustomer" ? "Create" : "Update"}
        </Button>
      </InlineButton>
    </div>
  );
}

export default CustomerForm;
