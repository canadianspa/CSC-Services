from flask import Blueprint, jsonify
import re

from common.api.google_service import GoogleService
from common.api.veeqo import get_orders

from .classes.vendor_details_factory import VendorDetailsFactory
from .classes.format_order_factory import FormatOrderFactory
from .utils import get_values_wrapper, append_values_wrapper


update = Blueprint("update", __name__)


@update.route("/update/<vendor>", methods=["GET"])
def update_request(vendor):
    orders = get_orders()

    vendor_details = VendorDetailsFactory(vendor)

    google_service = GoogleService()

    values = get_values_wrapper(google_service, vendor_details)
    po_numbers = re.findall(r"\d+", str(values))

    formatted_orders = []

    for order in orders:
        if is_new_order(order, po_numbers, vendor_details):
            formatted_order = FormatOrderFactory(vendor, order)
            formatted_orders.append(formatted_order)

    append_values_wrapper(
        google_service,
        vendor_details,
        values,
        formatted_orders,
    )

    return jsonify(formatted_orders)


def is_new_order(order, po_numbers, vendor_details):
    if str(order["id"]) not in po_numbers and order["status"] != "cancelled":
        if (
            str(order["channel"]["id"]) == vendor_details.channel_id
            and order["deliver_to"]["first_name"] != "B & Q plc"
            and order["deliver_to"]["first_name"] != "B&Q plc"
        ):
            return True

        elif (
            vendor_details.name == "hornbach"
            and "Hornbach" in order["billing_address"]["first_name"]
        ):
            return True

        else:
            return False
    else:
        return False
