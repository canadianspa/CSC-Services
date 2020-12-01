from pandas import date_range, to_datetime

from common.api.google_service import GoogleService
from common.config import BANDQ_SPREADSHEET_ID, BANDQ_SPREADSHEET_NAME
from .classes.formatted_order import FormattedOrder

def dates_between(start, end):
    # pylint: disable=no-member

    start_date = to_datetime(start).date()
    end_date = to_datetime(end).date()

    dt_index = date_range(start_date, end_date, freq='d')
    formatted_dt_index = dt_index.strftime(f"%d/%m/%Y")

    return formatted_dt_index.values


def get_orders():
    range_str = f"{BANDQ_SPREADSHEET_NAME}!A100:T"

    google_service = GoogleService()
    values = google_service.get_values(BANDQ_SPREADSHEET_ID, range_str)

    return format_orders(values)


def format_orders(orders):
    formatted_orders = []

    for order in orders:
        try:
            formatted_order = FormattedOrder(order)
            formatted_orders.append(formatted_order)
        except: 
            pass

    return formatted_orders


def matching_element(element, array):
    for var in array:
        if element in var:
            return True

    return False