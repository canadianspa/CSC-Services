import React from "react";

import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { Select, Header } from "../../Shared";

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
      <Header>Select Carrier</Header>
      <Select
        name="carrier"
        useObjects={true}
        options={carriers}
        objectTitleKey="title"
        onChange={updateFormState}
      />
      {carrier.accounts && (
        <>
          <Header>Select Account</Header>
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
