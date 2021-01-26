from flask import Blueprint, jsonify, request
import re

from common.config import GOOGLE_DRIVE_PACKING_SLIP_FOLDER_ID
from common.api.google_service import GoogleService
from common.api.veeqo import create_order_note, download_packing_slip
from .builders.event_builder import build_event


calendar = Blueprint("calendar", __name__)

google_service = GoogleService()


@calendar.route("/calendar/calendars", methods=["GET"])
def load():
    calendars = google_service.calendar.get_calendars()

    calendars.reverse()

    return jsonify(calendars)


@calendar.route("/calendar/create", methods=["POST"])
def create():
    body = request.json

    order = body["order"]

    file_path = download_packing_slip(order["id"])

    file_name = f'{order["deliver_to"]["last_name"]} {order["number"]}'
    mime_type = "application/pdf"

    uploaded_file = google_service.drive.upload(
        file_name,
        file_path,
        mime_type,
        GOOGLE_DRIVE_PACKING_SLIP_FOLDER_ID,
    )

    attachments = [
        {
            "fileUrl": uploaded_file["webViewLink"],
            "mimeType": uploaded_file["mimeType"],
            "title": uploaded_file["name"],
        }
    ]

    event = build_event(
        google_service.calendar.create_event,
        body,
        order,
        attachments,
    )

    note = f'Delivery Event Created: {event["htmlLink"]}'

    create_order_note(order["id"], note)

    return jsonify(event)
