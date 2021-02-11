import React from "react";
import styles from "./CalendarPage.module.css";

import { FormGroup, Label, Input, Button } from "reactstrap";
import { Select, MultiSelect } from "../Shared";

function InitialView({ formState, onFormChange, calendars, emails, toggleView }) {
  const { orderUrl, calendar, attendees } = formState;

  return (
    <div className={styles.eventForm}>
      <FormGroup>
        <Label>Veeqo Order URL</Label>
        <Input
          name="orderUrl"
          type="text"
          placeholder="URL"
          value={orderUrl}
          onChange={onFormChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Select Calendar</Label>
        <Select
          name="calendar"
          options={calendars}
          objectTitleKey="summary"
          onChange={onFormChange}
          useObjects
          useEvent
          style={{ marginBottom: "10px", width: "250px" }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Attendees</Label>
        <MultiSelect
          name="attendees"
          placeholder="Email"
          options={attendees}
          onChange={onFormChange}
          predefinedSuggestions={emails}
          useEvent
        />
      </FormGroup>
      <Button onClick={toggleView}>Next</Button>
    </div>
  );
}

export default InitialView;
