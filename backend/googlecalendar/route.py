from flask import Blueprint, jsonify, request
import re

from common.api.google_service import GoogleService
from common.api.veeqo import create_order_note
from .builders.event_builder import build_event


calendar = Blueprint("calendar", __name__)

calendar_service = GoogleService().calendar


@calendar.route("/calendar", methods=["GET"])
def load():
    calendars = calendar_service.get_calendars()

    return jsonify(calendars)


@calendar.route("/calendar", methods=["POST"])
def create():
    body = request.json

    order = body["order"]

    event = build_event(
        calendar_service.create_event,
        body,
        order,
    )

    note = f'Delivery Event Created: {event["htmlLink"]}'

    create_order_note(order["id"], note)

    return jsonify(event)
