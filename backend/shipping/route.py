from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from jsonschema import validate

from common.utils import class_to_json
from .config import MONGO_CLIENT_URL
from .schema.item import item_schema
from .classes.carrier_factory import CarrierFactory
from .database.mongo import MongoCollectionWrapper

shipping = Blueprint('shipping', __name__)

client = MongoClient(MONGO_CLIENT_URL)
database = client.shipping
items_collection = database.items


@shipping.route("/shipping/carriers", methods=['GET'])
def carriers_request():
    carriers_arr = [
        CarrierFactory("xdp"),
        CarrierFactory("dx_freight"),
    ]
    carriers = class_to_json(carriers_arr)

    return jsonify(carriers)


@shipping.route('/shipping/items', methods=['GET', 'POST', 'DELETE'])
def items_request():
    collection = MongoCollectionWrapper(items_collection)
    id = request.args.get('id')

    if request.method == 'GET':
        items = collection.read()
        return jsonify(items)

    elif request.method == 'POST':
        item = request.json
        try:
            validate(instance=item, schema=item_schema)

            if id is None:
                collection.create(item)
            else:
                collection.update(id, item)
        except Exception as e:
            print(str(e))
            return {"error": True}

    elif request.method == 'DELETE':
        collection.delete(id)

    return jsonify([])


@shipping.route('/shipping/create/', methods=['POST'])
def create_shipment_request():
    shipment = request.json
    print(shipment)

    return jsonify([])
