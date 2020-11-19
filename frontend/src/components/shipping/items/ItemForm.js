import React from "react";

import { Input, FormGroup, Label } from "reactstrap";

function ItemForm({ formState, onFormChange }) {
  const { name, height, width, length, weight } = formState;

  return (
    <>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" name="name" value={name} onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Height (cm)</Label>
        <Input
          name="height"
          type="number"
          min={0}
          value={height}
          onChange={onFormChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Width (cm)</Label>
        <Input
          name="width"
          type="number"
          min={0}
          value={width}
          onChange={onFormChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Length (cm)</Label>
        <Input
          name="length"
          type="number"
          min={0}
          value={length}
          onChange={onFormChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Weight (kg)</Label>
        <Input
          name="weight"
          type="number"
          min={0}
          value={weight}
          onChange={onFormChange}
        />
      </FormGroup>
    </>
  );
}

export default ItemForm;
