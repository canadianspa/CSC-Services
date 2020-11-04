from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

from ..config import (
    GOOGLE_SHEETS_SCOPES,
    GOOGLE_CREDENTIALS_PATH,
    GOOGLE_TOKEN_PATH
)


class GoogleService:
    def __init__(self):
        creds = None

        if os.path.exists(GOOGLE_TOKEN_PATH):
            with open(GOOGLE_TOKEN_PATH, 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    GOOGLE_CREDENTIALS_PATH, GOOGLE_SHEETS_SCOPES)
                creds = flow.run_local_server(port=0)
            with open(GOOGLE_TOKEN_PATH, 'wb') as token:
                pickle.dump(creds, token)

        self.service = build(
            'sheets', 'v4', credentials=creds, cache_discovery=False)

    def get_values(self, spreadsheet_id, range_str):
        # pylint: disable=maybe-no-member
        sheet = self.service.spreadsheets()
        result = sheet.values().get(
            spreadsheetId=spreadsheet_id,
            range=range_str).execute()

        return result.get('values', [])

    def append_values(self, spreadsheet_id, range_str, values):
        # pylint: disable=maybe-no-member
        sheet = self.service.spreadsheets()
        value_input_option = 'RAW'
        body = {
            'values': values
        }

        return sheet.values().update(
            spreadsheetId=spreadsheet_id,
            range=range_str,
            valueInputOption=value_input_option,
            body=body).execute()
