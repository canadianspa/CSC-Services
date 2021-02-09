from common.config import VEEQO_APP_ORDERS_URL

class FormattedOrder():
    def __init__(self, order):
        self.id = order[3]
        self.url = f"{VEEQO_APP_ORDERS_URL}/{order[3][3:]}"
        
        self.price_with_vat = float(order[2].replace(",", ""))
        self.price_ex_vat = float(order[18].replace(",", ""))

        self.date = order[8]
        self.delivery_date = order[7]

        self.items = []

        if order[10]:
            self.items.append(order[10])
        if order[11]:
            self.items.append(order[11])
        if order[12]:
            self.items.append(order[12])