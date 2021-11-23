from flask import Blueprint, jsonify, request
import re

from common.api.veeqo import get_order_details


veeqo = Blueprint("veeqo", __name__)


@veeqo.route("/veeqo", methods=["GET"])
def veeqo_request():
    url = request.args.get("url")

    try:
        order_id = re.findall(r"\d{8,9}", url)[0]
        order = get_order_details(order_id)

        return jsonify(order)
    except:
        return jsonify({"error": True, "message": "Invalid Order URL"})
