class Item:
    def __init__(
        self, sellable_id, quantity, price_per_unit, tax_rate
    ):
        if sellable_id == "" or quantity == "" or price_per_unit == "" or tax_rate == "":
            raise Exception("Incomplete Item fields.")

        self.sellable_id = sellable_id
        self.quantity = quantity
        self.price_per_unit = price_per_unit
        self.tax_rate = tax_rate
