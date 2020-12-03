from flask import Blueprint, request, jsonify
import re

from common.utils import class_to_json
from common.api.veeqo import get_order_details, create_shipment

from .api.shipping_api import get_quotes, create_consignment
from .classes.carrier import Carrier
from .database.mongo import ItemsCollectionBuilder
from .builder.shipping_request_builder import build_shipping_request

shipping = Blueprint('shipping', __name__)

collection = ItemsCollectionBuilder()


@shipping.route("/shipping/carriers", methods=['GET'])
def carriers_request():
    services = get_quotes("xdpa")

    carriers_arr = [
        Carrier("xdpa", "XDP A Account", services),
        Carrier("xdpb", "XDP B Account", services),
        Carrier("xdpc", "XDP C Account", services),
    ]

    carriers = class_to_json(carriers_arr)

    return jsonify(carriers)


@shipping.route('/shipping/items', methods=['GET', 'POST', 'DELETE'])
def items_request():
    _id = request.args.get('id')
    response = None

    try:
        if request.method == 'GET':
            response = collection.read()

        elif request.method == 'POST':
            item = request.json

            result = collection.upsert(_id, item)
            response = {
                "status": "updated" if _id else "created",
                "item": result
            }

        elif request.method == 'DELETE':
            _id = collection.delete(_id)
            response = {
                "status": "deleted",
                "_id": _id
            }

    except Exception as e:
        response = {
            "error": True,
            "message": str(e),
        }

    return jsonify(response)


@shipping.route('/shipping/create/', methods=['POST'])
def create_shipment_request():
    shipment = request.json
    response = None

    order_ids = re.findall(r"\d{8}", shipment["order_url"])

    if len(order_ids) > 0:
        order_id = order_ids[0]

        order = get_order_details(order_id)

        allocation = order["allocations"][0]

        if allocation["shipment"] == None:
            consignment = build_shipping_request(order, shipment)

            try:
                carrier = shipment["carrier"]
                response = create_consignment(carrier, consignment)

                try:
                    tracking_number = response["tracking_number"]

                    create_shipment(
                        order_id,
                        allocation["id"],
                        tracking_number
                    )
                except Exception as e:
                    print(str(e))
                    response = {
                        "error": True,
                        "message": "Error adding tracking to Veeqo"
                    }

            except Exception as e:
                print(str(e))
                response = {
                    "error": True,
                    "message": "Error creating consignment"
                }
        else:
            response = {
                "error": True,
                "message": "Veeqo Order already shipped"
            }
    else:
        response = {
            "error": True,
            "message": "Invalid order URL"
        }

    return jsonify(response)
