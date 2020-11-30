from flask import Blueprint, request, jsonify

from .api.postcoder import check_postcode

postcoder = Blueprint('postcoder', __name__)


@postcoder.route("/postcoder", methods=['GET'])
def postcoder_request():
    query = request.args.get('postcode')
    response = check_postcode(query)
    return jsonify(response)
