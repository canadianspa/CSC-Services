from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.http import MediaFileUpload

from ..config import GOOGLE_CREDS, GOOGLE_SCOPES, GOOGLE_TOKEN


class GoogleService:
    def __init__(self):
        creds = None

        if os.path.exists(GOOGLE_TOKEN):
            with open(GOOGLE_TOKEN, "rb") as token:
                creds = pickle.load(token)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    GOOGLE_CREDS,
                    GOOGLE_SCOPES,
                )
                creds = flow.run_local_server(port=0)
            with open(GOOGLE_TOKEN, "wb") as token:
                pickle.dump(creds, token)

        self.sheets = self.Sheets(creds)
        self.calendar = self.Calendar(creds)
        self.drive = self.Drive(creds)

    class Sheets:
        def __init__(self, creds):
            self.service = build(
                "sheets",
                "v4",
                credentials=creds,
                cache_discovery=False,
            )

        def get_values(self, spreadsheet_id, range_str):
            # pylint: disable=maybe-no-member
            sheet = self.service.spreadsheets()
            result = (
                sheet.values()
                .get(spreadsheetId=spreadsheet_id, range=range_str)
                .execute()
            )

            return result.get("values", [])

        def append_values(self, spreadsheet_id, range_str, values):
            # pylint: disable=maybe-no-member
            sheet = self.service.spreadsheets()

            value_input_option = "RAW"
            body = {
                "values": values,
            }

            return (
                sheet.values()
                .update(
                    spreadsheetId=spreadsheet_id,
                    range=range_str,
                    valueInputOption=value_input_option,
                    body=body,
                )
                .execute()
            )

    class Calendar:
        def __init__(self, creds):
            self.service = build(
                "calendar",
                "v3",
                credentials=creds,
            )

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
            attachments=None,
        ):
            # pylint: disable=maybe-no-member
            events = self.service.events()

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
                "attachments": attachments,
                "reminders": {
                    "useDefault": True,
                },
            }

            return events.insert(
                calendarId=calendarId,
                body=event,
                supportsAttachments=True,
            ).execute()

    class Drive:
        def __init__(self, creds):
            self.service = build(
                "drive",
                "v3",
                credentials=creds,
            )

        def upload(
            self,
            file_name,
            file_path,
            mime_type,
            folder_id=None,
        ):
            # pylint: disable=maybe-no-member
            files = self.service.files()

            file_metadata = {
                "name": file_name,
            }

            if folder_id is not None:
                file_metadata["parents"] = [folder_id]

            media = MediaFileUpload(file_path, mimetype=mime_type)

            return files.create(
                body=file_metadata,
                media_body=media,
                fields="webViewLink,mimeType,name,id",
            ).execute()
