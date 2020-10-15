from .api.veeqo import get_orders

def update_vendor_spreadsheet(vendor):
    orders = get_orders()
    print(orders)

    return []