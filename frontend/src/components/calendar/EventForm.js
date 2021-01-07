import React from "react";

import { Form, FormGroup, Label, Input } from "reactstrap";

function EventForm({ onFormChange }) {
  return (
    <Form style={{ width: "400px" }}>
      <FormGroup>
        <Label>Veeqo Order URL</Label>
        <Input name="veeqoUrl" type="text" onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Title</Label>
        <Input name="title" type="text" onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Date</Label>
        <Input type="date" name="date" onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Time</Label>
        <Input type="time" name="time" onChange={onFormChange} />
      </FormGroup>
    </Form>
  );
}

export default EventForm;
