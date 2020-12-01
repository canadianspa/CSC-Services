from flask import Blueprint, jsonify, request

from common.utils import class_to_json
from .utils import dates_between, get_orders, matching_element

bandq = Blueprint('bandq', __name__)


@bandq.route("/bandq/turnover", methods=['GET'])
def turnover_request():
    start = request.args.get('start')
    end = request.args.get('end')

    date_array = dates_between(start, end)

    total_ex_vat = 0
    total_with_vat = 0

    for order in get_orders():
        if matching_element(order.date, date_array) and order.price_with_vat != 0:
            total_with_vat += order.price_with_vat
            total_ex_vat += order.price_ex_vat

    response = {
        "total_with_vat": f"{total_with_vat:.2f}",
        "total_ex_vat": f"{total_ex_vat:.2f}"
    }

    return jsonify(response)


@bandq.route("/bandq/orderwell", methods=['GET'])
def orderwell_request():
    orderwell = []

    for order in get_orders():
        if order.price_with_vat > 500 and not order.delivery_date:
            order_json = class_to_json(order)
            orderwell.insert(0, order_json) # Prepend
    
    return jsonify(orderwell)