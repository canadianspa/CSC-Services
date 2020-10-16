class Item:
    def __init__(
        self, sellable_id, quantity, price_per_unit, tax_rate
    ):
        if sellable_id == "" or sellable_id == None:
            raise ValueError("sellable_id: " + sellable_id)
        if price_per_unit == "" or price_per_unit == None:
            raise ValueError("price_per_unit: " + price_per_unit)
        if tax_rate == "" or tax_rate == None:
            raise ValueError("tax_rate: " + tax_rate)
        if quantity == "" or quantity == "0" or quantity == None:
            raise ValueError("Quantity: " + quantity)

        self.sellable_id = sellable_id
        self.quantity = quantity
        self.price_per_unit = price_per_unit.replace(",", "")
        self.tax_rate = tax_rate
