import csv

from veeqoimporters.strategies.customer_strategy import customer_strategy
from veeqoimporters.config import ORDERS_CSV_PATH


def main():
    with open(ORDERS_CSV_PATH) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0
        for row in csv_reader:
            if line_count > 0:
                #print(f"Reading row: {line_count}, order no. {row[0]}")
                customer = customer_strategy('bandq', row)

                attrs = vars(customer)
                print(', '.join("%s: %s" % item for item in attrs.items()))

            line_count += 1


if __name__ == "__main__":
    main()
