from veeqoimporters.classes.item import Item
from veeqoimporters.classes.customer import Customer
# Class for UPLOADING to Veeqo


class Order:
    def __init__(
        self, customer, channel_id, billing_id, items, notes
    ):
        if channel_id == "" or billing_id == "":
            raise TypeError(
                "Incomplete channel_id or billing_id fields - Order class.")

        if not isinstance(customer, Customer):
            raise TypeError(
                "Customer field not of class Customer - Order class.")

        if not isinstance(items, list) or not items:
            raise TypeError("Incomplete items field - Order class.")

        self.customer = customer
        self.channel_id = channel_id
        self.billing_id = billing_id
        self.items = items
        self.notes = notes
