import json

from common.api.google_service import GoogleService
from common.config import BANDQ_SPREADSHEET_ID, BANDQ_SPREADSHEET_NAME

def handle_orderwell_request():
    google_service = GoogleService()
    
    range_str = f"{BANDQ_SPREADSHEET_NAME}!C97:M"
    values = google_service.get_values(BANDQ_SPREADSHEET_ID, range_str)

    print(json.dumps(values))
    return []
