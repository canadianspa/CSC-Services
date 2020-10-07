from ..config import BANDQ_CHANNEL_ID, TAX_RATE
from ..classes.item import Item
from ..classes.customer import Customer
from ..classes.order import Order
from ..api.veeqo import upload_order, get_sellable_id


def handle_bandq_csv():
    customer = Customer()
    channel_id = BANDQ_CHANNEL_ID
    billing_id = get_billing_id("B&Q Limited")
    items = []
    notes = "TESTING jasper.haward@canadianspacompany.com"

    # for items in order...
    sellable_id = get_sellable_id("KA-10134")
    sellable_item = Item(sellable_id, 2, 20.00, TAX_RATE)

    items.insert(len(items), sellable_item)

    order = Order(customer, channel_id, billing_id, items, notes)

    upload_order(order)


def get_billing_id(billing_name):
    if billing_name == "B&Q Limited":
        return "23657440"
    if billing_name == "B&Q Ireland Ltd":
        return "23677719"
    if billing_name == "B&Q (Retail) Jersey Ltd":
        return "23677785"
    if billing_name == "B&Q (Retail) Guernsey Ltd":
        return "23677822"

    raise Exception("Invalid billing name.")
