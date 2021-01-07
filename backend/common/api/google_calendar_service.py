from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

from ..config import (
    GOOGLE_CALENDAR_SCOPES,
    GOOGLE_CALENDAR_TOKEN_PATH,
    GOOGLE_CALENDAR_CREDS_PATH,
)


class GoogleCalendarService:
    def __init__(self):
        creds = None

        if os.path.exists(GOOGLE_CALENDAR_TOKEN_PATH):
            with open(GOOGLE_CALENDAR_TOKEN_PATH, "rb") as token:
                creds = pickle.load(token)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    GOOGLE_CALENDAR_CREDS_PATH, GOOGLE_CALENDAR_SCOPES
                )
                creds = flow.run_local_server(port=0)
            with open(GOOGLE_CALENDAR_TOKEN_PATH, "wb") as token:
                pickle.dump(creds, token)

        self.service = build("calendar", "v3", credentials=creds)

    def get_calendars(self):
        page_token = None
        calendars = []

        while True:
            # pylint: disable=maybe-no-member
            calendar_list = (
                self.service.calendarList().list(pageToken=page_token).execute()
            )
            for calendar_list_entry in calendar_list["items"]:
                calendars.append(calendar_list_entry)
            page_token = calendar_list.get("nextPageToken")
            if not page_token:
                break

        return calendars

    def create_event(
        self,
        calendarId,
        summary,
        location,
        description,
        start,
        end,
        attendees,
    ):
        event = {
            "summary": summary,
            "location": location,
            "description": description,
            "start": {
                "dateTime": start,
                "timeZone": "Europe/London",
            },
            "end": {
                "dateTime": end,
                "timeZone": "Europe/London",
            },
            "attendees": attendees,
            "reminders": {
                "useDefault": True,
            },
        }

        # pylint: disable=maybe-no-member
        return (
            self.service.events()
            .insert(
                calendarId=calendarId,
                body=event,
            )
            .execute()
        )


# now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time
# [{"email": "jasper.haward@canadianspacompany.com"},]