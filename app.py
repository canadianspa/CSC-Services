import csv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from spreadsheetupdaters.main import handle_update_request

from veeqoimporters.main import handle_orders_request, handle_import_request, handle_postcoder_request

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')
    

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/update', methods=['GET'])
def update_request():
    vendor = request.args.get('vendor')

    json = handle_update_request(vendor)

    return jsonify(json)


@app.route('/orders', methods=['POST'])
def orders_request():
    vendor = request.args.get('vendor')

    json = handle_orders_request(vendor, request)
            
    return jsonify(json)


@app.route('/import', methods=['POST'])
def import_request():
    orders = request.json

    json = handle_import_request(orders)

    return jsonify(json)


@app.route('/postcoder', methods=['GET'])
def postcoder_request():
    query = request.args.get('query')
    
    json = handle_postcoder_request(query)

    return jsonify(json)


if __name__ == "__main__":
    app.run(debug=True, threaded=True)