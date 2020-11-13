import pymongo

from .classes.carrier_factory import CarrierFactory

# mongod.exe --dbpath="M:\mongo\data\db"
# start db cmd


def handle_carriers_request():
    return [
        CarrierFactory("xdp"),
        CarrierFactory("dx_freight"),
    ]


def handle_items_request():
    # ADD DB CALL
    print('items call')
    return []


def handle_update_item_request(item):
    print(item)
    if item["_id"]:
        print("update item")
    else:
        print("create item")

    return []


def handle_delete_item_request(id):
    # UPDATE DB ITEM
    print('items delete call')
    return []


def handle_create_shipment_request(carrier):
    print(carrier)
    return []
