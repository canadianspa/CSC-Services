import io
import csv

from .builders.order import build_order

def handle_csv_input(file):
    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    delimited_input = csv.reader(stream)
    # Remove header row
    next(delimited_input)

    orders = []

    for row in delimited_input:
        order = build_order(row)

        if len(orders) == 0 or orders[-1]["id"] != order["id"]:
            orders.append(order)

    return orders
