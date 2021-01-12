from common.config import VEEQO_APP_ORDERS_URL


def build_event(create_event, body, order, attachments):
    calendar_id = body["calendar"]["id"]

    summary = body["title"]
    location = (
        f'{order["deliver_to"]["address1"]}, '
        f'{order["deliver_to"]["city"]}, '
        f'{order["deliver_to"]["zip"]}, '
        f'{order["deliver_to"]["country"]}'
    )
    description = (
        f'<a href="{VEEQO_APP_ORDERS_URL}/{order["id"]}">Order {order["number"]}</a><br/>'
        f'{order["deliver_to"]["first_name"]} {order["deliver_to"]["last_name"]}<br/>'
        f'{order["deliver_to"]["phone"]}<br/>'
        f'{order["deliver_to"]["email"]}<br/>'
    )
    start = body["start"]
    end = body["end"]
    attendees = build_attendees(body["attendees"])

    return create_event(
        calendar_id,
        summary,
        location,
        description,
        start,
        end,
        attendees,
        attachments,
    )


def build_attendees(attendees):
    formatted_attendees = []

    for attendee in attendees:
        formatted_attendees.append(
            {"email": attendee},
        )

    return formatted_attendees