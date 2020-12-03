import React from "react";

import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { Header, Select } from "../../Shared";

function CreateShipmentForm({ formState, carriers, onFormChange, updateFormState }) {
  return (
    <>
      <InputGroup style={{ width: "400px" }}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>URL</InputGroupText>
        </InputGroupAddon>
        <Input
          name="orderUrl"
          type="text"
          placeholder="Veeqo Order URL"
          value={formState.orderUrl}
          onChange={onFormChange}
        />
      </InputGroup>
      <Header>Select Carrier</Header>
      <Select
        name="carrier"
        useObjects={true}
        options={carriers}
        onChange={updateFormState}
      />
      <Header>Select Service</Header>
      <Select
        name="service"
        useObjects={true}
        options={formState.carrier.services}
        onChange={updateFormState}
      />
      <Header>Parcels</Header>
    </>
  );
}

export default CreateShipmentForm;
