import io
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS

from veeqoimporters.main import convert_data_to_json

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/import', methods=['POST'])
def upload_file():
    vendor = request.args.get('vendor')
    file = request.files['file']
    if file:
        stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_input = csv.reader(stream)
        next(csv_input)

        json = convert_data_to_json(vendor, csv_input)

        return jsonify(json)
    else:
        return "400 Bad request.", 400


app.run()
