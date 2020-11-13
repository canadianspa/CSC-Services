import csv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from spreadsheetupdaters.main import handle_update_request
from veeqoimporters.main import handle_convert_file_request, handle_import_orders_request
from postcoder.main import handle_postcoder_request
from turnover.main import handle_turnover_request
from orderwell.main import handle_orderwell_request
from shipping.main import (
    handle_carriers_request,
    handle_items_request,
    handle_update_item_request,
    handle_delete_item_request,
    handle_create_shipment_request
)


app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


######## UPDATE #######


@app.route('/api/update/<vendor>', methods=['GET'])
def update_request(vendor):
    json = handle_update_request(vendor)

    return jsonify(json)


######## IMPORT #######


@app.route('/api/import/convert/<vendor>', methods=['POST'])
def convert_request(vendor):
    json = handle_convert_file_request(vendor, request)

    if json == None:
        json = {"error": True}

    return jsonify(json)


@app.route('/api/import/orders', methods=['POST'])
def import_orders_request():
    orders = request.json

    json = handle_import_orders_request(orders)

    return jsonify(json)


######## POSTCODER #######


@app.route('/api/postcoder', methods=['GET'])
def postcoder_request():
    query = request.args.get('postcode')

    json = handle_postcoder_request(query)

    return jsonify(json)


######## TURNOVER #######


@app.route('/api/turnover', methods=['GET'])
def turnover_request():
    date = request.args.get('date')

    json = handle_turnover_request(date)

    return jsonify(json)


######## ORDERWELL #######


@app.route('/api/orderwell', methods=['GET'])
def orderwell_request():
    json = handle_orderwell_request()

    return jsonify(json)


######## SHIPPING #######


@app.route('/api/shipping/carriers', methods=['GET'])
def carriers_request():
    json = handle_carriers_request()

    return jsonify(json)


@app.route('/api/shipping/items/<id>', methods=['GET', 'PUT', 'DELETE'])
def items_request(id):
    json = ""
    if request.method == 'GET':
        json = handle_items_request()
    elif request.method == 'POST':
        item = request.json
        json = handle_update_item_request(item)
    elif request.method == 'DELETE':
        json = handle_delete_item_request(id)

    return jsonify(json)


@app.route('/api/shipping/create/<carrier>', methods=['POST'])
def create_shipment_request(carrier):
    json = handle_create_shipment_request(carrier)

    return jsonify(json)


if __name__ == "__main__":
    CORS(app)
    app.run(debug=True, threaded=True)
