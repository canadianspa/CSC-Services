import React from "react";

import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Select from "../../shared/Select";

function IntialView({ carriers, formState, onFormChange, updateFormState }) {
  const { carrier, orderUrl } = formState;

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
          value={orderUrl}
          onChange={onFormChange}
        />
      </InputGroup>
      <h5>Select Carrier</h5>
      <Select
        name="carrier"
        useObjects={true}
        options={carriers}
        objectTitleKey="title"
        onChange={updateFormState}
      />
      {carrier.accounts && (
        <>
          <h5>Select Account</h5>
          <Select
            name="account"
            options={carrier.accounts}
            onChange={onFormChange}
          />
        </>
      )}
    </>
  );
}

export default IntialView;
