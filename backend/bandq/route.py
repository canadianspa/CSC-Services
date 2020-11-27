from flask import Blueprint, jsonify, request

from common.api.google_service import GoogleService
from common.config import (
    BANDQ_SPREADSHEET_ID,
    BANDQ_SPREADSHEET_NAME,
    VEEQO_APP_ORDERS_URL
)

bandq = Blueprint('bandq', __name__)

range_str = f"{BANDQ_SPREADSHEET_NAME}!C100:T"

google_service = GoogleService()
spreadsheet_values = google_service.get_values(BANDQ_SPREADSHEET_ID, range_str)


@bandq.route("/bandq/comparison", methods=['GET'])
def comparison_request():
    start_date = request.args.get('startdate')
    end_date = request.args.get('enddate')

    return jsonify([])


@bandq.route("/bandq/turnover", methods=['GET'])
def turnover_request():
    month_year_string = request.args.get('date')

    total_ex_vat = 0
    total_with_vat = 0

    for order in spreadsheet_values:
        try:
            order_date = order[6]
            price_with_vat = float(order[0].replace(",", ""))
            price_ex_vat = float(order[16].replace(",", ""))

            if month_year_string in order_date and price_with_vat != 0:
                total_with_vat += price_with_vat
                total_ex_vat += price_ex_vat

        except:
            pass

    response = {
        "total_with_vat": f"{total_with_vat:.2f}",
        "total_ex_vat": f"{total_ex_vat:.2f}"
    }

    return jsonify(response)


@bandq.route("/bandq/orderwell", methods=['GET'])
def orderwell_request():
    orders = []
    for order in spreadsheet_values:
        try:
            price = float(order[0].replace(",", ""))
            delivery_date = order[4]

            if price > 500 and not delivery_date:
                order_obj = format_order(order)
                orders.append(order_obj)
        except:
            pass

    return jsonify(orders[::-1])


def format_order(order):
    order_obj = {}

    order_obj['date'] = order[6]
    order_obj['id'] = order[1]
    order_obj['url'] = f"{VEEQO_APP_ORDERS_URL}/{order[1][3:]}"
    order_obj['items'] = []

    if order[8]:
        order_obj['items'].append(order[8])
    if order[9]:
        order_obj['items'].append(order[9])
    if order[10]:
        order_obj['items'].append(order[10])

    return order_obj
