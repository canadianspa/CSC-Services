from flask import Blueprint, request, jsonify

from common.api.google_service import GoogleService
from common.config import BANDQ_SPREADSHEET_ID, BANDQ_SPREADSHEET_NAME, VEEQO_APP_ORDERS_URL

from .api.postcoder import check_postcode

postcoder = Blueprint('postcoder', __name__)


@postcoder.route("/postcoder", methods=['GET'])
def postcoder_request():
    query = request.args.get('postcode')
    response = check_postcode(query)
    return jsonify(response)
