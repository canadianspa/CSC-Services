import atexit
from apscheduler.schedulers.background import BackgroundScheduler

from datetime import datetime
from dateutil import parser

from common.api.veeqo import get_cancelled_orders, create_order_note


def cancellation_notification():
    # U23425 = ANIQA, U27768 = ROBBIE
    message = "[@U23425] [@U27768]: ORDER CANCELLED"

    orders = get_cancelled_orders()

    for order in orders:
        _id = order["id"]
        cancelled_at = order["cancelled_at"]
        if cancelled_at:
            cancelled_at = parser.parse(cancelled_at)
            now = datetime.now()

            if cancelled_at.date() == now.date():
                create_order_note(_id, message)


scheduler = BackgroundScheduler()
scheduler.add_job(
    func=cancellation_notification,
    trigger='cron',
    hour='23',
    minute='45',
    second='00',
)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())
