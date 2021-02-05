import re
import csv
import pathlib
from pdfminer.layout import LTTextContainer

from common.config import (
    CSC_GMBH_CHANNEL_ID,
    HORNBACH_BILLING_ID,
    TAX_RATE,
)
from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


file_path = pathlib.Path(__file__)

HORNBACH_STOCK_PATH = f"{file_path.parent}\\stock\\hornbach_stock.csv"

def hornbach_pdf_to_customer(pdf_pages):
    delivery_info = []

    for page_layout in pdf_pages:
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                text = element.get_text()

                if "Lieferadresse:" in text:
                    delivery_info = text.split('\n')

    phone = ""
    email = ""
    address = []

    for line in delivery_info:
        if "Tel." in line:
            phone = line[4:]
        elif "E-Mail:" in line:
            email = line[7:]
        elif "Fax:" in line:
            pass
        elif line != "":
            address.append(line)

    last_line = address[-1].split(' ', 1)

    first_name = " ".join(address[:-4]).replace("Lieferadresse:", "")
    last_name = address[-3]
    address1 = address[-2]
    address2 = ""
    city = last_line[1]
    county = ""
    postcode = last_line[0]
    country = ""

    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)


def hornbach_pdf_to_items(pdf_pages):
    items = []

    for page_layout in pdf_pages:
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                text = element.get_text()

                skus = re.findall(r"^K[A-Z]-\d{5}$", text)
                if len(skus) > 0:
                    sku = skus[0]

                    sellable_id = get_sellable_id(sku)
                    price_per_unit = get_price(sku)
                    quantity = "1"

                    item = Item(sellable_id, quantity,
                                price_per_unit, TAX_RATE)
                    items.append(item)

    return items


def hornbach_pdf_to_order(pdf_pages, customer, items):
    supplier_number = ""
    order_number = ""

    for page_layout in pdf_pages:
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                text = element.get_text()

                if "Lieferanten-Nr" in text:
                    supplier_number = text.split()[-1]

                if "Bestellung Nr" in text:
                    order_number = text.split()[-1]

    notes = order_number + " " + supplier_number

    return Order(customer, CSC_GMBH_CHANNEL_ID, HORNBACH_BILLING_ID, items, notes)


def get_price(sku):
    with open(HORNBACH_STOCK_PATH) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        next(csv_reader)

        for row in csv_reader:
            if row[3] == sku:
                return row[10]

    raise Exception(f"Could not find {sku} in Hornbach stock")
