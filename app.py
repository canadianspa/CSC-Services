import csv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from spreadsheetupdaters.main import update_vendor_spreadsheet

from veeqoimporters.main import handle_orders_request
from veeqoimporters.api.veeqo import upload_order
from veeqoimporters.api.postcoder import check_postcode

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')
    

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/update', methods=['GET'])
def update_spreadsheet():
    vendor = request.args.get('vendor')
    order_array = update_vendor_spreadsheet(vendor)

    return jsonify(order_array)


@app.route('/orders', methods=['POST'])
def get_orders_json():
    vendor = request.args.get('vendor')

    json = handle_orders_request(vendor, request)
        
    return jsonify(json)



@app.route('/import', methods=['POST'])
def import_to_veeqo():
    orders = request.json
    for order in orders:
        upload_order(order)

    return jsonify({ "status": "Uploaded ${orders.length} orders"})


@app.route('/postcoder', methods=['GET'])
def get_addresses():
    query = request.args.get('query')
    address_array = check_postcode(query)

    return jsonify(address_array)


if __name__ == "__main__":
    app.run()