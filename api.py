import io
import csv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from veeqoimporters.main import convert_data_to_json
from veeqoimporters.api.veeqo import upload_order
from veeqoimporters.api.postcoder import check_postcode

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/convert', methods=['POST'])
def file_to_json():
    vendor = request.args.get('vendor')
    file = request.files['file']
    if file:
        stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_input = csv.reader(stream)
        next(csv_input)

        json = convert_data_to_json(vendor, csv_input)

        return jsonify(json)
    else:
        return "Bad request: No file supplied.", 400


@app.route('/import', methods=['POST'])
def import_to_veeqo():
    orders = request.json
    for order in orders:
        upload_order(order)

    return jsonify({ "status": "Uploaded ${orders.length} orders."})


@app.route('/postcoder', methods=['GET'])
def get_addresses():
    query = request.args.get('query')
    address_array = check_postcode(query)
    return jsonify(address_array)


app.run()