import csv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from spreadsheetupdaters.main import handle_update_request
from veeqoimporters.main import handle_orders_request, handle_import_request
from postcoder.main import handle_postcoder_request
from turnover.main import handle_turnover_request
from orderwell.main import handle_orderwell_request


app = Flask(__name__, static_folder='./build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')
    

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/api/update', methods=['GET'])
def update_request():
    vendor = request.args.get('vendor')

    json = handle_update_request(vendor)

    return jsonify(json)


@app.route('/api/orders', methods=['POST'])
def orders_request():
    vendor = request.args.get('vendor')

    try:
        json = handle_orders_request(vendor, request)
        return jsonify(json)
    except:
        json = { "error": True }
        return jsonify(json)
    


@app.route('/api/import', methods=['POST'])
def import_request():
    orders = request.json

    json = handle_import_request(orders)

    return jsonify(json)


@app.route('/api/postcoder', methods=['GET'])
def postcoder_request():
    query = request.args.get('postcode')
    
    json = handle_postcoder_request(query)

    return jsonify(json)


@app.route('/api/turnover', methods=['GET'])
def turnover_request():
    date = request.args.get('date')

    json = handle_turnover_request(date)

    return jsonify(json)

    
@app.route('/api/orderwell', methods=['GET'])
def orderwell_request():
    json = handle_orderwell_request()

    return jsonify(json)


if __name__ == "__main__":
    CORS(app)
    app.run(debug=True, threaded=True)