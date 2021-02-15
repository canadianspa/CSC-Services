import io
import csv

from common.api.veeqo import get_order_details

def handle_csv_input(file):
    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    delimited_input = csv.reader(stream)
    # Remove header row
    next(delimited_input)

    orders = []

    for row in delimited_input:
        order_id = int(row[0])

        if len(orders) == 0 or orders[-1]["id"] != order_id:
            orders.append(
                get_order_details(order_id),
            )

    return orders
