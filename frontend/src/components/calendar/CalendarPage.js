import React, { useState, useReducer, useEffect } from "react";
import "./CalendarPage.css";

import moment from "moment";
import { toast } from "react-toastify";

import * as api from "../../api/BackendApi";
import { EMAILS } from "../../config";
import { reducer } from "../utils";
import { Jumbotron, Spinner } from "../Shared";
import FormView from "./FormView";
import InitialView from "./InitialView";

const defaultAttendees = [
  EMAILS[0],
  EMAILS[1],
]

const initialFormState = {
  orderUrl: "",
  calendar: null,
  attendees: defaultAttendees,
  title: "",
  date: "",
  time: "",
  length: "30",
};

function CalendarPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("initial");
  const [formState, setFormState] = useReducer(reducer, initialFormState);

  const [calendars, setCalendars] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    api.getCalendars().then((response) => {
      onFormChange(response[0], "calendar");
      setCalendars(response);
      setLoading(false);
    });
  }

  function toggleView() {
    if (view === "initial") {
      var params = {
        orderUrl: formState.orderUrl,
      };

      api.getVeeqoOrder(params).then((response) => {
        onResponse(response, () => {
          toast.dark(`Using order ${response.number}`);
          setOrder(response);
          setView("form");
        });
      });
    } else {
      setView("initial");
    }
  }

  function onFormChange(event, name) {
    if (name) {
      setFormState({ [name]: event });
    } else {
      const { name, value } = event.target;
      setFormState({ [name]: value });
    }
  }

  function createEvent() {
    const { calendar, title, date, time, length, attendees } = formState;

    if (title !== "" && date !== "" && time !== "") {
      setLoading(true);

      var datetime = `${date} ${time}`;
      var format = "YYYY-MM-DD HH-mm";
      var start = moment(datetime, format);

      var params = {
        event: {
          order: order,
          calendar: calendar,
          attendees: attendees,
          title: title,
          start: start.toISOString(),
          end: start.add(length, "minutes").toISOString(),
        },
      };

      api.createEvent(params).then((response) => {
        setLoading(false);
        
        onResponse(response, () => {
          toast.dark("Event added successfully");
          setInitialState();
        });
      });
    } else {
      toast.dark("No inputs may be empty");
    }
  }

  function onResponse(response, onSuccess) {
    if (response.error) {
      toast.error(response.message);
    } else {
      onSuccess(response);
    }
  }

  function setInitialState() {
    setFormState({
      ...initialFormState,
      calendar: calendars[0],
    });
    setOrder(null);
    setView("initial");
  }

  return (
    <div className="container">
      <Jumbotron>Create Event</Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : view === "initial" ? (
        <InitialView
          formState={formState}
          onFormChange={onFormChange}
          calendars={calendars}
          emails={EMAILS}
          toggleView={toggleView}
        />
      ) : (
        <FormView
          formState={formState}
          onFormChange={onFormChange}
          onSubmit={createEvent}
          toggleView={toggleView}
        />
      )}
    </div>
  );
}

export default CalendarPage;
