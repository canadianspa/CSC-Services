from flask import Blueprint, jsonify
import re
import json

from .classes.vendor_details_factory import VendorDetailsFactory
from .strategies.format_order_strategy import format_order_strategy

from common.api.google_service import GoogleService
from common.api.veeqo import get_orders

update = Blueprint('update', __name__)


@update.route('/update/<vendor>', methods=['GET'])
def update_request(vendor):
    orders = get_orders()

    vendor_details = VendorDetailsFactory(vendor)
    google_service = GoogleService()

    values = get_values(google_service, vendor_details)
    po_numbers = re.findall(r'\d+', str(values))

    formatted_orders = []
    for order in orders:
        if is_new_order(order, po_numbers, vendor_details):
            formatted_order = format_order_strategy(vendor, order)
            formatted_orders.append(formatted_order)

    append_values(google_service, vendor_details, values, formatted_orders)

    return jsonify(formatted_orders)


def get_values(google_service, vendor_details):
    # String determining which sheet & column contains order numbers
    range_str = f"{vendor_details.ss_name}!{vendor_details.ss_order_column}:{vendor_details.ss_order_column}"
    values = google_service.get_values(vendor_details.ss_id, range_str)
    return values


def append_values(google_service, vendor_details, values, orders):
    range_str = f"{vendor_details.ss_name}!A{str(len(values) + 1)}:V"

    google_service.append_values(vendor_details.ss_id, range_str, orders)


def is_new_order(order, po_numbers, vendor_details):
    if str(order['id']) not in po_numbers and order['status'] != 'cancelled':
        if (str(order['channel']['id']) == vendor_details.channel_id
                and order['deliver_to']['first_name'] != 'B & Q plc'
                and order['deliver_to']['first_name'] != 'B&Q plc'):
            return True

        elif vendor_details.name == "hornbach" and "Hornbach" in order['billing_address']['first_name']:
            return True
    else:
        return False
