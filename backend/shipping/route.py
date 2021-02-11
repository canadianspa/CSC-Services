from flask import Blueprint, request, jsonify
import base64
from .utils import merge_pdfs
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
    
@shipping.route("/shipping/create", methods=["POST"])
def create_request():
    body = request.json
    #shipment = create_shipment(body)

    #merge_pdfs(labels)


    return jsonify(body)