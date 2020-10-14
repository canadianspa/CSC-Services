import csv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from veeqoimporters.main import handle_csv_file, handle_xml_file, handle_range
from veeqoimporters.api.veeqo import upload_order
from veeqoimporters.api.postcoder import check_postcode

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config["DEBUG"] = False
CORS(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')
    

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/orders', methods=['POST'])
def get_orders_json():
    vendor = request.args.get('vendor')
    json = ""

    if 'file' in request.files:
        file = request.files['file']
        file_type = file.filename.split('.')[-1]

        if file_type == "csv":
            json = handle_csv_file(vendor, file)
        
        elif file_type == "xml":
            json = handle_xml_file(vendor, file)
        
        return jsonify(json)

    elif vendor == "range":
        json = handle_range(vendor)
        return jsonify(json)

    else:
        return "Bad request: No file supplied or incorrect vendor.", 400


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