from flask import Blueprint, jsonify, request
import re

from common.api.google_calendar_service import GoogleCalendarService
from common.api.veeqo import get_order_details


calendar = Blueprint("calendar", __name__)

calendar_service = GoogleCalendarService()


@calendar.route("/calendar", methods=["GET"])
def load():
    calendars = calendar_service.get_calendars()

    return jsonify(calendars)


@calendar.route("/calendar", methods=["POST"])
def create():
    body = request.json

    order_ids = re.findall(r"\d{8}", body["veeqo_url"])

    if len(order_ids) == 1:
        order_id = order_ids[0]

        order = get_order_details(order_id)

    # calendar_service.create_event()

    return jsonify([])


# else:
# return jsonify({"error": True, "message": "Invalid order URL"})
