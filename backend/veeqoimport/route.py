from flask import Blueprint, request, jsonify
import traceback

from common.api.veeqo import import_order
from .handlers import (
    handle_limited_input,
    handle_pdf_file,
    handle_xml_file,
    handle_range
)

veeqoimport = Blueprint('veeqoimport', __name__)


@veeqoimport.route('/import/orders', methods=['GET'])
def handle_import_orders_request():
    orders = request.json
    imported_orders = []

    for order in orders:
        imported_order = import_order(order)
        imported_orders.append(imported_order)

    return jsonify(imported_orders)


@veeqoimport.route('/import/convert/<vendor>', methods=['POST'])
def convert_request(vendor):
    response = None
    try:
        if 'file' in request.files:
            file = request.files['file']
            file_type = file.filename.split('.')[-1]

            if file_type == "csv":
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
