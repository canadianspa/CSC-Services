import React from "react";

import { FormGroup, Label, Input, Button } from "reactstrap";

function EventForm({ formState, onFormChange, onSubmit, toggleView }) {
  const { title, date, time, length } = formState;

  return (
    <div style={{ width: "400px" }}>
      <FormGroup>
        <Label>Title</Label>
        <Input name="title" type="text" value={title} onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Date</Label>
        <Input type="date" name="date" value={date} onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Time</Label>
        <Input type="time" name="time" value={time} onChange={onFormChange} />
      </FormGroup>
      <FormGroup>
        <Label>Length (min)</Label>
        <Input type="select" name="length" value={length} onChange={onFormChange}>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
        </Input>
      </FormGroup>
      <div className="centered-parent">
        <Button color="danger" onClick={toggleView}>
          Back
        </Button>
        <Button onClick={onSubmit}>Create</Button>
      </div>
    </div>
  );
}

export default EventForm;
