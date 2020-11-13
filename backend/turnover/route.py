from flask import Blueprint, request, jsonify

from common.api.google_service import GoogleService
from common.config import BANDQ_SPREADSHEET_ID, BANDQ_SPREADSHEET_NAME, VEEQO_APP_ORDERS_URL

turnover = Blueprint('turnover', __name__)


@turnover.route("/turnover", methods=['GET'])
def turnover_request():
    month_year_string = request.args.get('date')

    google_service = GoogleService()

    range_str = f"{BANDQ_SPREADSHEET_NAME}!C100:T"
    values = google_service.get_values(BANDQ_SPREADSHEET_ID, range_str)

    total_ex_vat = 0
    total_with_vat = 0

    for order in values:
        try:
            order_date = order[6]
            price_with_vat = float(order[0].replace(",", ""))
            price_ex_vat = float(order[-1].replace(",", ""))

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
