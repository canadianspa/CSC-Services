import re
import json

from .classes.vendor_details_factory import VendorDetailsFactory
from .api.veeqo import get_orders
from .api.google_service import GoogleService
from .strategies.invoicing_order_strategy import invoicing_order_strategy

def handle_update_request(vendor):
    orders = get_orders()

    vendor_details = VendorDetailsFactory().build(vendor)
    google_service = GoogleService()

    # String determining which sheet & column contains order numbers 
    po_number_col = vendor_details.spreadsheet_order_column
    get_range_str = vendor_details.spreadsheet_name + f"!{po_number_col}:{po_number_col}"

    values = google_service.get_values(vendor_details.spreadsheet_id, get_range_str)
    po_numbers = re.findall(r'\d+', str(values))
    
    formatted_orders = []
    for order in orders:
        if str(order['channel']['id']) == vendor_details.channel_id and str(order['id']) not in po_numbers:
            formatted_order = invoicing_order_strategy(vendor, order)
            if formatted_order is not None:
                formatted_orders.append(formatted_order)

    append_range_str = vendor_details.spreadsheet_name + "!A" + str(len(values) + 1) + ":V"
    google_service.append_values(vendor_details.spreadsheet_id, append_range_str, formatted_orders)

    return formatted_orders

