class Item:
    def __init__(
        self,
        sellable_id,
        quantity,
        price_per_unit,
        tax_rate
    ):
        if sellable_id == "":
            raise ValueError(f"sellable_id: {sellable_id}")
        if price_per_unit == "":
            raise ValueError(f"price_per_unit: {price_per_unit}")
        if tax_rate == "":
            raise ValueError(f"tax_rate: {tax_rate}")
        if quantity == "":
            raise ValueError(f"quantity: {quantity}")

        self.sellable_id = sellable_id
        self.quantity = quantity
        self.price_per_unit = price_per_unit.replace(",", "")
        self.tax_rate = tax_rate
