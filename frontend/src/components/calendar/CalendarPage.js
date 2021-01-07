import React, { useState, useReducer, useEffect } from "react";
import "./CalendarPage.css";

import { Button } from "reactstrap";

import * as api from "../../api/BackendApi";
import { reducer } from "../utils";
import { Jumbotron, Select, Header, Spinner } from "../Shared";

import EventForm from "./EventForm";

const initialFormState = {
  calendar: null,
  veeqoUrl: "",
  title: "",
  date: "",
  time: "",
};

function CalendarPage() {
  const [loading, setLoading] = useState(true);
  const [calendars, setCalendars] = useState([]);

  const [formState, setFormState] = useReducer(reducer, initialFormState);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    api.getCalendars().then((data) => {
      setCalendars(data);
      setLoading(false);
    });
  }

  function onCalendarChange(calendar) {
    setFormState({ calendar: calendar });
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function createEvent() {
    console.log(formState);
    // api.createEvent
  }

  return (
    <div className="container">
      <Jumbotron>Calendar</Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <div className="event-form">
          <Header>Select Calendar</Header>
          <Select
            options={calendars}
            objectTitleKey="summary"
            onChange={onCalendarChange}
            useObjects={true}
            style={{ width: "250px" }}
          />
          <EventForm onFormChange={onFormChange} />
          <Button onClick={createEvent}>Create</Button>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
