import csv
import json

from veeqoimporters.config import ORDERS_CSV_PATH
from veeqoimporters.strategies.customer_strategy import customer_strategy
from veeqoimporters.strategies.item_strategy import item_strategy
from veeqoimporters.strategies.order_strategy import order_strategy
from veeqoimporters.api.veeqo import upload_order


def main():
    VENDOR = 'bandq'

    with open(ORDERS_CSV_PATH) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        next(csv_reader)  # Remove header row

        order_list = []
        previous_customer = None

        for row in csv_reader:
            customer = customer_strategy(VENDOR, row)
            item = item_strategy(VENDOR, row)

            if previous_customer is not None and previous_customer == customer:
                order_list[-1].items.append(item)

            else:
                previous_customer = customer
                items = [item]
                order = order_strategy(VENDOR, row, customer, items)

                order_list.append(order)

        for order in order_list:
            order_json = order.convert_order_to_json()
            order_string = json.dumps(order_json)
            upload_order(order_string)


if __name__ == "__main__":
    main()
