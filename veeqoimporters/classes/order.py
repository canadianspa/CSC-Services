from veeqoimporters.classes.item import Item
from veeqoimporters.classes.customer import Customer
from veeqoimporters.config import DEFAULT_DELIVERY_METHOD_ID


class Order:
    def __init__(
        self, customer, channel_id, billing_id, items, notes
    ):
        if channel_id == "" or billing_id == "":
            raise TypeError("Incomplete channel_id or billing_id fields.")

        if not isinstance(customer, Customer):
            raise TypeError("Customer field not of class Customer.")

        if not isinstance(items, list) or not items:
            raise TypeError("Incomplete items field.")

        self.customer = customer
        self.channel_id = channel_id
        self.billing_id = billing_id
        self.items = items
        self.notes = notes

    def convert_order_to_json(self):
        deliver_to_attributes = self.customer.convert_customer_to_json()

        line_items_attributes = []
        for item in self.items:
            item_json = item.convert_item_to_json()
            line_items_attributes.append(item_json)

        return {
            "order": {
                "channel_id": self.channel_id,
                "delivery_method_id": DEFAULT_DELIVERY_METHOD_ID,
                "customer_id": self.billing_id,
                "customer_attributes": {
                    "id": self.billing_id,
                },
                "deliver_to_attributes": deliver_to_attributes,
                "line_items_attributes": line_items_attributes,
                "customer_note_attributes": {
                    "text": self.notes
                },
            }
        }
