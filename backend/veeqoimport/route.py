from flask import Blueprint, request, jsonify
import traceback

from common.api.veeqo import create_order
from .handlers import (
    handle_limited_input,
    handle_pdf_file,
    handle_xml_file,
    handle_range,
    handle_range_store,
)

veeqoimport = Blueprint("veeqoimport", __name__)


@veeqoimport.route("/import/orders", methods=["POST"])
def handle_import_orders_request():
    orders = request.json
    imported_orders = []

    for order in orders:
        imported_orders.append(
            create_order(order),
        )

    return jsonify(imported_orders)


@veeqoimport.route("/import/convert/<vendor>", methods=["POST"])
def convert_request(vendor):
    response = None
    try:
        if "file" in request.files:
            file = request.files["file"]
            file_type = file.filename.split(".")[-1]

            if vendor == "range_store":
                response = handle_range_store(vendor, file)

            elif file_type == "csv":
                response = handle_limited_input(vendor, file, ",")
            elif file_type == "txt":
                response = handle_limited_input(vendor, file, "|")
            elif file_type == "xml":
                response = handle_xml_file(vendor, file)
            elif file_type == "pdf":
                response = handle_pdf_file(vendor, file)

        elif vendor == "range":
            response = handle_range(vendor)

    except Exception as e:
        print("Error: " + str(e))
        print(traceback.format_exc())

    return jsonify(response)
