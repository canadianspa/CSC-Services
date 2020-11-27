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

    try:
        response = None
        if request.method == 'GET':
            response = collection.read()

        elif request.method == 'POST':
            item = request.json
            validate(instance=item, schema=item_schema)

            result = collection.upsert(id, item)
            response = { 
                "status": "updated" if id else "created",
                "item": result
            }
        
        elif request.method == 'DELETE':
            _id = collection.delete(id)
            response = { 
                "status": "deleted",
                "_id": _id
            }

    except Exception as e:
        print(str(e))
        response = {
            "error": True,
            "message": str(e)
        }
        
    return jsonify(response)



@shipping.route('/shipping/create/', methods=['POST'])
def create_shipment_request():
    shipment = request.json
    print(shipment)


    


    return jsonify([])
