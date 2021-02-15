from flask import Blueprint, request, jsonify

from common.api.veeqo import attach_shipment
from .api.shipping import get_quotes, create_shipment
from .builder import build_shipment
from .handlers.pdf import merge_pdfs, save_pdfs
from .handlers.csv import handle_csv_input

shipping = Blueprint("shipping", __name__)


@shipping.route("/shipping/convert", methods=["POST"])
def convert_request():
    try:
        csv_file = request.files["file"]
        orders = handle_csv_input(csv_file)

        return jsonify(orders)

    except:
        response = { "error": True, "message": "No file recieved"}

        return jsonify(response)


@shipping.route("/shipping/quotes", methods=["GET"])
def quotes_request():
    quotes = get_quotes()

    return jsonify(quotes)
    

@shipping.route("/shipping/create", methods=["POST"])
def create_request():
    body = request.json

    orders = body["orders"]
    service_code = body["service_code"]
    parcels = body["parcels"]

    labels = []
    shipped = []
    failed = []

    for order in orders: 
        allocation = order["allocations"][0]

        if allocation["shipment"] is None:
            try:
                shipment_body = build_shipment(order, service_code, parcels)
                shipment = create_shipment(shipment_body)

                labels.append(shipment['label'])

                attach_shipment(
                    order["id"], 
                    allocation["id"],
                    shipment['tracking_number']
                )

                shipped.append({
                    "order": order,
                    "shipment": shipment,
                })
            except Exception as e:
                failed.append({ "message": str(e), "order": order })
                print(str(e))
                continue 
        else:
            failed.append({ "message": "Order already shipped", "order": order })
 
    files = save_pdfs(labels)
    label = merge_pdfs(files)
    
    response = { 
        "shipped": shipped,
        "failed": failed,
        "label": label,
    }

    return jsonify(response)