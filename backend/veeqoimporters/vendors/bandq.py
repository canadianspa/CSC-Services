from common.config import (
    TAX_RATE, 
    BANDQ_CHANNEL_ID,
    BANDQ_BILLING_ID,
    BANDQ_IRELAND_BILLING_ID,
    BANDQ_JERSEY_BILLING_ID,
    BANDQ_GUERNSEY_BILLING_ID,
)

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def bandq_csv_to_customer(csv_row):
    first_name = csv_row[14].rsplit(' ', 1)[0]
    last_name = csv_row[14].split()[-1]
    address1 = csv_row[15]
    address2 = ""
    city = csv_row[16]
    county = ""
    postcode = csv_row[18]
    country = csv_row[17]
    phone = csv_row[19]
    email = csv_row[21]

    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)

    
def bandq_csv_to_item(csv_row):
    sku = csv_row[29]
    sellable_id = get_sellable_id(sku)
    quantity = csv_row[31]
    price_per_unit = csv_row[35]

    billing_name = csv_row[8]
    tax_rate = TAX_RATE

    if "Jersey" in billing_name or "Guernsey" in billing_name:
        tax_rate = 0

    return Item(sellable_id, quantity, price_per_unit, tax_rate)


def bandq_csv_to_order(csv_row, customer, items):
    billing_id = get_billing_id(csv_row[8])
    
    order_no = csv_row[0]
    sales_order_no = csv_row[23]
    site_code = csv_row[13]

    notes = order_no + " " + sales_order_no + " " + site_code + " " + customer.email 

    return Order(customer, BANDQ_CHANNEL_ID, billing_id, items, notes)


def get_billing_id(billing_name):
    if billing_name == "B&Q Limited":
        return BANDQ_BILLING_ID
    if billing_name == "B&Q Ireland Ltd":
        return BANDQ_IRELAND_BILLING_ID
    if billing_name == "B&Q (Retail) Jersey Ltd":
        return BANDQ_JERSEY_BILLING_ID
    if billing_name == "B&Q (Retail) Guernsey Ltd":
        return BANDQ_GUERNSEY_BILLING_ID