from flask import Blueprint, request, jsonify

from .handlers import handle_csv_input
from .api.shipping import get_quotes, create_shipment

shipping = Blueprint("shipping", __name__)


@shipping.route("/shipping/convert", methods=["POST"])
def convert_request():
    if "file" in request.files:
        _file = request.files["file"]
        
        orders = handle_csv_input(_file)

        return jsonify(orders)

    else:
        response = { "error": True, "message": "No file given"}

        return jsonify(response)

@shipping.route("/shipping/quotes", methods=["GET"])
def quotes_request():
    quotes = get_quotes()

    return jsonify(quotes)
    
@shipping.route("/shipping/create", methods=["GET"])
def create_request():
    body = request.json

    shipment = create_shipment(body)

    return jsonify(shipment)