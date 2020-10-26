import re
import json

from .classes.vendor_details_factory import VendorDetailsFactory
from .strategies.format_order_strategy import format_order_strategy

from common.api.google_service import GoogleService
from common.api.veeqo import get_orders


def handle_update_request(vendor):
    orders = get_orders()

    vendor_details = VendorDetailsFactory().build(vendor)
    google_service = GoogleService()

    # String determining which sheet & column contains order numbers 
    get_range_str = f"{vendor_details.spreadsheet_name}!{vendor_details.spreadsheet_order_column}:{vendor_details.spreadsheet_order_column}"
    
    values = google_service.get_values(vendor_details.spreadsheet_id, get_range_str)
    po_numbers = re.findall(r'\d+', str(values))

    formatted_orders = []
    for order in orders:
        if is_new_order(order, po_numbers, vendor_details):
            formatted_order = format_order_strategy(vendor, order)
            formatted_orders.append(formatted_order)

    append_range_str = vendor_details.spreadsheet_name + "!A" + str(len(values) + 1) + ":V"
    google_service.append_values(vendor_details.spreadsheet_id, append_range_str, formatted_orders)

    return formatted_orders


def is_new_order(order, po_numbers, vendor_details):
    if (order['status'] != 'cancelled' and 
            str(order['id']) not in po_numbers and
            str(order['channel']['id']) == vendor_details.channel_id and 
            order['deliver_to']['first_name'] != 'B & Q plc' and 
            order['deliver_to']['first_name'] != 'B&Q plc'):
        return True
    else:
        return False

